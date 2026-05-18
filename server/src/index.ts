import "dotenv/config";
import express from "express";
import cors from "cors";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const app = express();

app.use(cors());
app.use(express.json());

console.log("BOOT: todos routes version 2026-05-18");

app.get("/", (_req, res) => {
  res.send("Todo API is running. Try /api/health or /api/todos");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/version", (_req, res) => {
  res.json({ version: "todos-routes-2026-05-18" });
});

let todos: Todo[] = [];

app.get("/api/todos", (_req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const text = String(req.body?.text ?? "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });

  const todo: Todo = { id: String(Date.now()), text, completed: false };
  todos = [todo, ...todos];

  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });

  const current = todos[idx];

  const next: Todo = {
    ...current,
    ...(typeof req.body?.text === "string" ? { text: req.body.text } : {}),
    ...(typeof req.body?.completed === "boolean"
      ? { completed: req.body.completed }
      : {}),
  };

  todos = todos.map((t) => (t.id === id ? next : t));
  res.json(next);
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);

  if (todos.length === before)
    return res.status(404).json({ error: "not found" });
  res.status(204).send();
});

app.delete("/api/todos", (_req, res) => {
  todos = todos.filter((t) => !t.completed);
  res.status(204).send();
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
