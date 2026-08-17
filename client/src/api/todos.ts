import { API_URL } from "./config";
import type { Todo } from "../types/todo";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }

  return (await res.json()) as T;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/api/todos`, {
    credentials: "include",
  });

  return json<Todo[]>(res);
}

export async function createTodo(text: string): Promise<Todo> {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ text }),
  });

  return json<Todo>(res);
}

export async function patchTodo(
  id: string,
  patch: Partial<Pick<Todo, "text" | "completed">>,
): Promise<Todo> {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(patch),
  });

  return json<Todo>(res);
}

export async function deleteTodoApi(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
}

export async function clearCompletedApi(): Promise<void> {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
}
