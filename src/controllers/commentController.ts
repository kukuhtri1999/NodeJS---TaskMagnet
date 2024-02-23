// src/controllers/CommentController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController {
  static async createComment(req: Request, res: Response): Promise<void> {
    try {
      const { taskId, comment } = req.body;
      const userId = (req as any).user.userId;

      const newComment = await prisma.comment.create({
        data: {
          taskId,
          userId,
          comment,
        },
      });

      res
        .status(201)
        .json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getCommentsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10);

      const userComments = await prisma.comment.findMany({
        where: {
          userId,
        },
      });

      res.status(200).json({ comments: userComments });
    } catch (error) {
      console.error("Error retrieving comments by user ID:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getCommentsByTaskId(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      const comments = await prisma.comment.findMany({
        where: {
          taskId,
        },
      });
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getCommentById(req: Request, res: Response): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId, 10);
      const comment = await prisma.comment.findUnique({
        where: {
          commentId,
        },
      });
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateCommentById(req: Request, res: Response): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId, 10);
      const { comment } = req.body;

      const updatedComment = await prisma.comment.update({
        where: {
          commentId,
        },
        data: {
          comment,
        },
      });

      res.status(200).json({ updatedComment });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteCommentById(req: Request, res: Response): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId, 10);
      await prisma.comment.delete({
        where: {
          commentId,
        },
      });

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CommentController;
