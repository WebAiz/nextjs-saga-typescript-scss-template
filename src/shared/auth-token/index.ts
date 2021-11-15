import { AuthResult }         from "@/src/interfaces/request.interfaces";
import { REFRESH_TOKEN_TIME } from "../constants";
import { getCurrentHost }     from "../../config";
import Storage                from "../local-storage";

const controlToken = {

    refreshToken: (isNeedCheckExpire = true) => {
        const expire = Storage.get("expire");
        const currentDate = new Date().getTime();
        const refreshToken = Storage.get("refreshToken");
        const isUserLoggedIn = Storage.get("isUserLoggedIn");
        const isAdminLoggedIn = Storage.get("isAdminLoggedIn");
        const isCompanyLoggedIn = Storage.get("isCompanyLoggedIn");
        const isLpLoggedIn = Storage.get("isLPLoggedIn");
        const userType = isAdminLoggedIn ? "admin" : isLpLoggedIn ? "lp" : isUserLoggedIn ? "user" : isCompanyLoggedIn ? "company" : "notFound";
        const urls = {
            admin:    "admin/refresh-token",
            user:     "user/personal/refresh-token",
            company:  "company/refresh-token",
            lp:       "lead_partner/refresh-token",
            notFound: "/"
        };

        if (!refreshToken || !userType || !expire) return false;

        if (isNeedCheckExpire && (+expire - currentDate > REFRESH_TOKEN_TIME)) return false;

        return { refreshToken, url: getCurrentHost + urls[userType] };
    },

    // TODO localstorage accepts DOMString type only
    setToken: (userType: string, result: AuthResult) => {
        const { expire, accessToken, refreshToken } = result || {};
        expire && Storage.set("expire", result["expire"]);
        accessToken && Storage.set("accessToken", result["accessToken"]);
        refreshToken && Storage.set("refreshToken", result["refreshToken"]);
        console.log("TOKEN", accessToken, Storage.get("accessToken"));
        switch (userType) {
            case "admin": {
                return Storage.set("isAdminLoggedIn", "true");
            }
            case "user": {
                console.log("IS USER LOGGED IN TRUE");
                return Storage.set("isUserLoggedIn", "true");
            }
            case "company": {
                return Storage.set("isCompanyLoggedIn", "true");
            }
            case "lp": {
                return Storage.set("isLPLoggedIn", "true");
            }
            default:
                return;
        }
    },

    removeToken: () => {
        Storage.remove("expire");
        Storage.remove("accessToken");
        Storage.remove("refreshToken");
        Storage.remove("isUserLoggedIn");
        Storage.remove("isCompanyLoggedIn");
        Storage.remove("isAdminLoggedIn");
        Storage.remove("isLPLoggedIn");
    }
};

export default controlToken;
