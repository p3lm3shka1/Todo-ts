import { useEffect, useMemo, useState } from "react";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import Filters from "../components/Filters";
import ThemeToggle from "../components/ThemeToggle";
import Attribution from "../components/Attribution";

import useLocalStorage from "../hooks/useLocalStorage";

import type { Todo, Filter } from "../types/todo";
import type { Theme } from "../types/ui";

import {
  fetchTodos,
  createTodo,
  patchTodo,
  deleteTodoApi,
  clearCompletedApi,
} from "../api/todos";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useLocalStorage<Filter>("filter", "all");
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  // load todos
  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch((e) => console.error("Failed to load todos:", e));
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const itemsLeft = useMemo(() => {
    return todos.filter((t) => !t.completed).length;
  }, [todos]);

  const addTodo = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      const created = await createTodo(trimmed);
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      console.error("Failed to create todo:", e);
    }
  };

  const toggleTodo = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    // optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

    try {
      const updated = await patchTodo(id, { completed: !current.completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      console.error("Failed to toggle todo:", e);
      // rollback
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: current.completed } : t,
        ),
      );
    }
  };

  const deleteTodo = async (id: string) => {
    // optimistic
    const prev = todos;
    setTodos((p) => p.filter((t) => t.id !== id));

    try {
      await deleteTodoApi(id);
    } catch (e) {
      console.error("Failed to delete todo:", e);
      setTodos(prev);
    }
  };

  const clearCompleted = async () => {
    const prev = todos;
    setTodos((p) => p.filter((t) => !t.completed));

    try {
      await clearCompletedApi();
    } catch (e) {
      console.error("Failed to clear completed:", e);
      setTodos(prev);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <main className={`app ${theme}`}>
      <section className="hero" />

      <section className="todo-wrapper">
        <header className="todo-header">
          <h1>TODO</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <TodoInput onAdd={addTodo} />

        <div className="todo-card">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <div className="todo-footer">
            <span>{itemsLeft} items left</span>

            <Filters current={filter} onChange={setFilter} />

            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>

        <div className="filters-mobile">
          <Filters current={filter} onChange={setFilter} />
        </div>
      </section>

      <Attribution />
    </main>
  );
};

export default TodoApp;
