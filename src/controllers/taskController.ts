// src/controllers/TaskController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskController {
  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, dueDate, priority, status } = req.body;
      const project = (req as any).project;

      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          dueDate,
          priority,
          status,
          projectId: project.projectId,
          userId: project.userId,
        },
      });

      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      console.error("Error in createTask controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getTasksByProjectId(req: Request, res: Response): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId, 10);

      const project = await prisma.project.findUnique({ where: { projectId } });

      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      // Get all tasks for the specific project
      const tasks = await prisma.task.findMany({
        where: { projectId },
      });

      if (tasks.length === 0) {
        res.status(404).json({ message: "No tasks found for the project" });
        return;
      }

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error in getTasksByProjectId controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getTasksByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { userId },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Get all tasks for the user
      const tasks = await prisma.task.findMany({
        where: { userId },
      });

      res.status(200).json({ tasks });
    } catch (error) {
      console.error("Error in getTasksByUserId controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);

      // Check if the task exists
      const task = await prisma.task.findUnique({
        where: { taskId },
      });

      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      res.status(200).json({ task });
    } catch (error) {
      console.error("Error in getTaskById controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      const { title, description, dueDate, priority, status } = req.body;

      // Check if the task exists
      const existingTask = await prisma.task.findUnique({
        where: { taskId },
      });

      if (!existingTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }

      // Update task details
      const updatedTask = await prisma.task.update({
        where: { taskId },
        data: {
          title,
          description,
          dueDate,
          priority,
          status,
        },
      });

      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      console.error("Error in updateTaskById controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);

      // Check if the task exists
      const existingTask = await prisma.task.findUnique({ where: { taskId } });

      if (!existingTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      // Delete the task
      await prisma.task.delete({ where: { taskId } });

      res.status(204).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default TaskController;
