// src/middlewares/ProjectMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectMiddleware {
  static validateGetAllProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // You can add any validation specific to this route if needed
    next();
  }

  static validateCreateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // You can add any validation specific to this route if needed
    next();
  }

  static async validateGetProjectById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId, 10);

      const project = await prisma.project.findUnique({
        where: { projectId },
      });

      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      (req as any).project = project;
      next();
    } catch (error) {
      console.error("Error in validateGetProjectById middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async validateUpdateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId, 10);

      const project = await prisma.project.findUnique({
        where: { projectId },
      });

      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const { projectName, description, startDate, endDate } = req.body;

      if (!projectName) {
        res.status(400).json({ error: "Project name is required" });
        return;
      }

      (req as any).project = project;
      next();
    } catch (error) {
      console.error("Error in validateUpdateProject middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async validateDeleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId, 10);

      const project = await prisma.project.findUnique({
        where: { projectId },
      });

      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      (req as any).project = project;
      next();
    } catch (error) {
      console.error("Error in validateDeleteProject middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ProjectMiddleware;
