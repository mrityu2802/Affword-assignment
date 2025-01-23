import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTask,
  deleteMultipleTasks,
  deleteTask,
  getTaskByID,
  getTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskByID);
router.post("/create", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);
router.delete("/tasks", authMiddleware, deleteMultipleTasks);

export default router;
