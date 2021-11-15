export const getCurrentHost = process.env.NEXT_PUBLIC_APP_API;

// export const getAuthBasicHeader = () => process.env.NEXT_PUBLIC_ENV !== "production" ? btoa(`${process.env.NEXT_PUBLIC_BASIC_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_PASSWORD}`) : false;

export const getAuthBasicHeader = () => process.env.NEXT_PUBLIC_ENV !== "production" ? false : false;
