import Error from "next/error";

export interface Api {
    GET(url: string, successCb: SuccessCbType, errorCb: ErrorCb): unknown;

    STREAM_BY_POST(url: string, params: Record<string, string>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    POST(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    POST_FULL(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    PUT(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    PUT_FULL(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    DELETE(url: string, successCb: SuccessCb, errorCb: ErrorCb): unknown

    POST_FILE(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    PATCH(url: string, params: Record<string, unknown>, successCb: SuccessCb, errorCb: ErrorCb): unknown;

    GEO(address: string, successCb: SuccessCb, errorCb: ErrorCb): unknown;
}

export interface MakeRequest {
    api: string;
    init: RequestInit;
    successCb: SuccessCbType;
    errorCb: ErrorCb
    isRefreshTokenCall?: boolean;
}

export interface ErrorCb {
    (error: typeof Error | string): void;
}

export type SuccessCbType = SuccessCb | null;

export interface SuccessCb {
    (arg: Record<string, any>): void
}

export interface SuccessCbAuth {
    (arg: { result: AuthResult }): void
}

export interface MakeFileRequest extends MakeRequest {
    fileName?: string;
}

export interface CheckAndMakeRequest extends MakeFileRequest {
    stream?: boolean;
}

export interface RefreshTokenRequest extends MakeRequest {
    refreshTokenObject: {
        url: string;
        refreshToken: string;
    }
}

export interface CheckStatus extends MakeRequest {
    response: {
        status: number;
        statusText: string;
        json: () => Promise<{ message: string }>
    }
}

export interface RequestHeader {
    method: string,
    params?: string[] | Record<string,unknown>  | null,
    paramsType?: boolean | string;
}

export interface AuthResult {
    accessToken: string;
    refreshToken: string;
    expire: string;
}

export interface ExtendedRequestInit extends RequestInit {
    headers: Record<string, string>
}
