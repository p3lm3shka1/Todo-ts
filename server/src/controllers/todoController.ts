import { Request, Response } from "express";
import Todo from "../models/Todo.js";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json(todos);
  } catch (error) {
    console.error("GET /api/todos error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const text = String(req.body.text || "").trim();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text) {
      return res.status(400).json({ message: "Enter some text" });
    }

    const todo = await Todo.create({ text, user: userId });

    return res.status(201).json(todo);
  } catch (error) {
    console.error("POST /api/todos error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const todo = await Todo.findOne({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (typeof req.body?.text === "string") {
      todo.text = req.body.text.trim();
    }

    if (typeof req.body?.completed === "boolean") {
      todo.completed = req.body.completed;
    }

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.error("PATCH /api/todos/:id error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("DELETE /api/todos/:id error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearCompletedTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Todo.deleteMany({ user: userId, completed: true });

    return res.status(204).send();
  } catch (error) {
    console.error("DELETE /api/todos error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
