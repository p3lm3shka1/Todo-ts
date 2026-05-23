import { API_URL } from "./config";

type AuthPayload = {
  email: string;
  password: string;
};

async function parseResponse(res: Response) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Expected JSON, got: ${text.slice(0, 120)}`);
  }
}

export const signupRequest = async ({ email, password }: AuthPayload) => {
  const url = `${API_URL}/api/auth/signup`;
  console.log("signup url =", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const loginRequest = async ({ email, password }: AuthPayload) => {
  const url = `${API_URL}/api/auth/login`;
  console.log("login url =", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};
