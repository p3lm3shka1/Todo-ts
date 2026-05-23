import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearCompletedTodos,
} from "../controllers/todoController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.delete("/", clearCompletedTodos);

export default router;
