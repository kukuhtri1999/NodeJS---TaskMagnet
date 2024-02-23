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
        include: {
          taskLabels: true, // Include related labels
        },
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
        include: {
          taskLabels: true, // Include related labels
        },
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
        include: {
          taskLabels: true, // Include related labels
        },
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
      const { title, description, dueDate, priority, status, labelId } =
        req.body;

      const existingTask = await prisma.task.findUnique({
        where: {
          taskId,
        },
        include: {
          taskLabels: true,
        },
      });

      if (!existingTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      const taskLabel = existingTask.taskLabels.find(
        (tl) => tl.taskId === existingTask.taskId
      );

      if (!taskLabel) {
        res.status(404).json({ error: "Task label not found" });
        return;
      }

      const updatedTask = await prisma.task.update({
        where: {
          taskId,
        },
        data: {
          title,
          description,
          dueDate,
          priority,
          status,
          taskLabels: {
            update: {
              where: {
                taskLabelId: taskLabel.taskLabelId,
              },
              data: {
                labelId,
              },
            },
          },
        },
        include: {
          taskLabels: {
            include: {
              label: true,
            },
          },
        },
      });

      res.status(200).json({ task: updatedTask });
    } catch (error) {
      console.error("Error updating task by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async deleteTaskById(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);

      const existingTask = await prisma.task.findUnique({
        where: {
          taskId,
        },
      });

      if (!existingTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      // Delete associated task labels
      await prisma.taskLabel.deleteMany({
        where: {
          taskId,
        },
      });

      // Delete the task
      const deletedTask = await prisma.task.delete({
        where: {
          taskId,
        },
      });

      res
        .status(200)
        .json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      console.error("Error deleting task by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default TaskController;
