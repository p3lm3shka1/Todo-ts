const DEFAULT_API_URL = import.meta.env.PROD
  ? "https://todo-ts-vr5s.onrender.com"
  : "http://localhost:3000";

const rawApiUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim();

export const API_URL = rawApiUrl.replace(/\/+$/, "");
