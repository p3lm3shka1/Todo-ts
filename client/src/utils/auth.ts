import { API_URL } from "../api/config";

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const refreshTokens = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};
