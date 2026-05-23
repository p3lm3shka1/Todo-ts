import { API_URL } from "./config";

export async function getHealth() {
  const res = await fetch(`${API_URL}/api/health`);

  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }

  return (await res.json()) as { status: string };
}
