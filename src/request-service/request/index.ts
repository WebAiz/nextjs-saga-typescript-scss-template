import { CheckAndMakeRequest, CheckStatus, MakeFileRequest, MakeRequest, RefreshTokenRequest } from "@/src/interfaces/request.interfaces";
import Storage      from "../../shared/local-storage";
import controlToken from "../../shared/auth-token";
import { setHeader }                                                                                                                         from "../request-headers";
import { METHODS }           from "../api-methods";
import { downloadObjectUrl } from "../../shared/helpers";
import { getCurrentHost }    from "../../config";

export const checkAndMakeRequest = ({ api, init, successCb, errorCb, stream = false }: CheckAndMakeRequest) => {
    const refreshTokenObject = controlToken.refreshToken(true);
    if (!refreshTokenObject || refreshTokenObject.url == null) {
        if (stream) {
            return makeFileRequest({ api, init, successCb, errorCb });
        } else {
            return makeRequest({ api, init, successCb, errorCb, isRefreshTokenCall: false });
        }
    } else {
        return refreshTokenRequest({ api, init, successCb, errorCb, refreshTokenObject });
    }
};

const makeFileRequest = ({ api, init, successCb, errorCb, fileName }: MakeFileRequest) => {
    console.log({ api, init });
    return fetch(api, init)
        .then((response) => {
            // console.log({response});
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error(`Ошибка сервера. ${response.status}`);
            }
        })
        .then((blob) => {
            console.log(blob.type);
            downloadObjectUrl(blob, fileName || "download.pdf");
            if (successCb) {
                successCb({ success: true, result: blob });
            }
        })
        .catch(error => {
            // console.log('!!!! File pipe',{error})
            errorCb(error);
        });
};
const makeRequest = ({ api, init, successCb, errorCb, isRefreshTokenCall }: MakeRequest) => {
    return fetch(api, init)
        .then((response) => checkStatus({ response, api, init, successCb, errorCb, isRefreshTokenCall }))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => error !== "need_sms" ? errorCb(error) : null);
};

const refreshTokenRequest = ({ api, init, successCb, errorCb, refreshTokenObject }: RefreshTokenRequest) => {
    const { url, refreshToken } = refreshTokenObject;
    const params = { "refresh_token": refreshToken };
    return makeRequest({
            api:                url,
            init:               setHeader({ method: METHODS.POST, params }),
            successCb:          (response) => {
                controlToken.setToken("", response.result);
                const { accessToken } = response.result;
                const newHeader =
                    makeRequest({ api, init: { ...init, headers: { ...init.headers, "access-token": accessToken } }, successCb, errorCb, isRefreshTokenCall: true });
            },
            errorCb:            (error) => {
                controlToken.removeToken();
                window.location.reload();
            },
            isRefreshTokenCall: true
        }
    );
};

const checkStatus = ({ response, api, init, successCb, errorCb, isRefreshTokenCall = false }: CheckStatus) => {
    if (response.status >= 200 && response.status <= 500) {
        if (response.status === 401) {
            if (isRefreshTokenCall) {
                controlToken.removeToken();
                window.location.reload();
                return Promise.reject(new Error(response.statusText));
            } else {
                const refreshTokenObject = controlToken.refreshToken(false);
                if (refreshTokenObject) {
                    refreshTokenRequest({ api, init, successCb, errorCb, refreshTokenObject });
                } else {
                    controlToken.removeToken();
                    if (window.location.pathname && window.location.pathname.length > 2) {
                        window.location.replace(window.location.origin);
                        window.location.reload();
                    }

                    return Promise.reject(new Error(response.statusText));
                }
            }
        }
        if (response.status === 403) {
            response.json().then((data) => {
                if (data.message === "need_sms_confirmation") {
                    Storage.remove("isUserLoggedIn");
                    Storage.remove("isLPLoggedIn");
                    window.location.replace("/login");
                }
            });
            return Promise.reject("need_sms");
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};
