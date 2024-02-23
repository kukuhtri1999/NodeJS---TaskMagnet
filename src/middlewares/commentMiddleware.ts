// src/middlewares/CommentMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentMiddleware {
  static async validateComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId, comment } = req.body;

      if (!taskId || !comment) {
        res.status(400).json({ error: "Task ID and comment are required" });
        return;
      }

      // Validate if the task exists
      const existingTask = await prisma.task.findUnique({
        where: {
          taskId,
        },
      });

      if (!existingTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      next();
    } catch (error) {
      console.error("Error in validateComment middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CommentMiddleware;
