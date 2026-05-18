import { useMemo } from "react";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import Filters from "../components/Filters";
import ThemeToggle from "../components/ThemeToggle";
import Attribution from "../components/Attribution";

import useLocalStorage from "../hooks/useLocalStorage";

import type { Todo, Filter } from "../types/todo";
import type { Theme } from "../types/ui";

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useLocalStorage<Filter>("filter", "all");
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const itemsLeft = useMemo(() => {
    return todos.filter((t) => !t.completed).length;
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const id = String(Date.now());

    setTodos((prev) => [{ id, text: trimmed, completed: false }, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
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
