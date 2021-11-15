export default {
    "set":    (key: string, val: string): void | null => typeof window === "undefined" ? null : localStorage.setItem(key, val),
    "get":    (key: string): string | null => typeof window === "undefined" ? null : localStorage.getItem(key),
    "remove": (key: string): void | null => typeof window === "undefined" ? null : localStorage.removeItem(key)
};
