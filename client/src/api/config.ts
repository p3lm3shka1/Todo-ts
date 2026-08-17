const DEFAULT_API_URL = import.meta.env.DEV ? "http://localhost:3000" : "";

const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim();

export const API_URL = rawApiUrl.replace(/\/+$/, "");
