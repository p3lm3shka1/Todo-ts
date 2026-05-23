import { API_URL } from "./config";
import type { Todo } from "../types/todo";
import { getToken } from "../utils/auth";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API error response text =", text);
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }

  const data = (await res.json()) as T;
  return data;
}

function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchTodos(): Promise<Todo[]> {
  const url = `${API_URL}/api/todos`;

  try {
    console.log("fetchTodos url =", url);
    console.log("fetchTodos token =", getToken());

    const res = await fetch(url, {
      headers: authHeaders(),
    });

    console.log("fetchTodos status =", res.status);

    const data = await json<Todo[]>(res);
    console.log("fetchTodos data =", data);

    return data;
  } catch (error) {
    console.error("fetchTodos failed:", error);
    throw error;
  }
}

export async function createTodo(text: string): Promise<Todo> {
  const url = `${API_URL}/api/todos`;

  try {
    console.log("createTodo url =", url);
    console.log("createTodo text =", text);
    console.log("createTodo token =", getToken());

    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ text }),
    });

    console.log("createTodo status =", res.status);

    const data = await json<Todo>(res);
    console.log("createTodo data =", data);

    return data;
  } catch (error) {
    console.error("createTodo failed:", error);
    throw error;
  }
}

export async function patchTodo(
  id: string,
  patch: Partial<Pick<Todo, "text" | "completed">>,
): Promise<Todo> {
  const url = `${API_URL}/api/todos/${id}`;

  try {
    console.log("patchTodo url =", url);
    console.log("patchTodo patch =", patch);
    console.log("patchTodo token =", getToken());

    const res = await fetch(url, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(patch),
    });

    console.log("patchTodo status =", res.status);

    const data = await json<Todo>(res);
    console.log("patchTodo data =", data);

    return data;
  } catch (error) {
    console.error("patchTodo failed:", error);
    throw error;
  }
}

export async function deleteTodoApi(id: string): Promise<void> {
  const url = `${API_URL}/api/todos/${id}`;

  try {
    console.log("deleteTodoApi url =", url);
    console.log("deleteTodoApi token =", getToken());

    const res = await fetch(url, {
      method: "DELETE",
      headers: authHeaders(),
    });

    console.log("deleteTodoApi status =", res.status);

    if (!res.ok && res.status !== 204) {
      const text = await res.text().catch(() => "");
      console.error("deleteTodoApi error text =", text);
      throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
    }
  } catch (error) {
    console.error("deleteTodoApi failed:", error);
    throw error;
  }
}

export async function clearCompletedApi(): Promise<void> {
  const url = `${API_URL}/api/todos`;

  try {
    console.log("clearCompletedApi url =", url);
    console.log("clearCompletedApi token =", getToken());

    const res = await fetch(url, {
      method: "DELETE",
      headers: authHeaders(),
    });

    console.log("clearCompletedApi status =", res.status);

    if (!res.ok && res.status !== 204) {
      const text = await res.text().catch(() => "");
      console.error("clearCompletedApi error text =", text);
      throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
    }
  } catch (error) {
    console.error("clearCompletedApi failed:", error);
    throw error;
  }
}
