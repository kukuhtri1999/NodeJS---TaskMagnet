// src/middlewares/taskMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskMiddleware {
  static async validateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, projectId } = req.body;

      // Validate title
      if (!title || typeof title !== "string") {
        res.status(400).json({ message: "Invalid title" });
        return;
      }

      // Validate projectId
      if (!projectId || typeof projectId !== "number") {
        res.status(400).json({ message: "Invalid projectId" });
        return;
      }

      // Check if the project exists
      const project = await prisma.project.findUnique({
        where: { projectId },
      });

      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      // Attach the project to the request object for later use
      (req as any).project = project;

      next();
    } catch (error) {
      console.error("Error in validateTask middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default TaskMiddleware;
