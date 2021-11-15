import process                 from "process";
import { Api }                 from "@/src/interfaces/request.interfaces";
import { getCurrentHost }      from "../config";
import { checkAndMakeRequest } from "./request";
import { setHeader }           from "./request-headers";
import { METHODS }             from "./api-methods";


const requestApi: Api = {
    GET: (url = "", successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.GET });
        return checkAndMakeRequest({ api, init, successCb, errorCb });
    },

    STREAM_BY_POST: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.POST, params, paramsType: "stream" });
        const fileName = params.fileName;
        return checkAndMakeRequest({ api, init, successCb, errorCb, stream: true, fileName });
    },

    POST: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.POST, params });
        return checkAndMakeRequest({ api, init, successCb, errorCb });

    },

    POST_FULL: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.POST, params, paramsType: "full" });
        return checkAndMakeRequest({ api, init, successCb, errorCb });

    },
    PUT:       (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.PUT, params });
        return checkAndMakeRequest({ api, init, successCb, errorCb });
    },

    PUT_FULL: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.PUT, params, paramsType: "full" });
        return checkAndMakeRequest({ api, init, successCb, errorCb });
    },

    DELETE: (url, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.DELETE });
        return checkAndMakeRequest({ api, init, successCb, errorCb });

    },

    POST_FILE: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.POST, params, paramsType: "onlyImages" });
        return checkAndMakeRequest({ api, init, successCb, errorCb });

    },

    PATCH: (url = "", params = {}, successCb, errorCb) => {
        const api = getCurrentHost + url;
        const init = setHeader({ method: METHODS.PATCH, params });
        return checkAndMakeRequest({ api, init, successCb, errorCb });

    },

    GEO: (address = "", successCb, errorCb) => {
        const env = process.env;
        const api = `https://geocode-maps.yandex.ru/1.x/?apikey=${env.REACT_APP_GEO_API_KEY}&format=json&geocode=${address}`;
        return fetch(api)
            .then((response) => response.json())
            .then((data) => {
                const res = data["response"]["GeoObjectCollection"]["featureMember"];
                if (!res || !res.length) {
                    errorCb("not-found");
                } else {
                    const lat = res[0]["GeoObject"]["Point"]["pos"].split(" ")[1];
                    const long = res[0]["GeoObject"]["Point"]["pos"].split(" ")[0];
                    successCb({ lat, long });
                }
            })
            .catch((error) => errorCb(error));
    }
};


export default requestApi;
