import { ExtendedRequestInit, RequestHeader } from "@/src/interfaces/request.interfaces";
import { ConvertObjectToFormData }            from "../../shared/helpers";
import Storage                                from "../../shared/local-storage";
import { getAuthBasicHeader }                 from "../../config";

const authorization = getAuthBasicHeader();

export const setHeader = ({ method, params = null, paramsType = false }: RequestHeader) => {
    const token = Storage.get("accessToken");
    const init: ExtendedRequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "accept":       "application/json"
        }
    };

    if (token) init.headers["access-token"] = token;
    if (authorization) init.headers["Authorization"] = `Basic ${authorization}`;

    if (params) {
        // TODO fix type
        if ("onlyImages" === paramsType) {
            delete init.headers["Content-Type"];
            init.body = new FormData();
            for (let i = 0; i < params.length; i++) {
                if (typeof params.item === "function") {
                    init.body.append(`images[${i}]`, params.item(i));
                } else {
                    init.body.append(`images[${i}]`, params[i]);
                }
            }

        } else if ("stream" === paramsType) {
            init.headers["accept"] = "application/pdf,text/*,*/*";
            init.body = JSON.stringify(params);
        } else if ("full" === paramsType) {
            delete init.headers["Content-Type"];

            init.body = ConvertObjectToFormData(params);
        } else {
            init.body = JSON.stringify(params);
        }
    }

    return init;
};

