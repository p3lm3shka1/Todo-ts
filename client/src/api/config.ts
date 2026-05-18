export const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_URL) {
  console.warn("VITE_API_URL is not set");
}
