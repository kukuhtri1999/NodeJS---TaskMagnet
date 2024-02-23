// src/controllers/ProjectController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectController {
  static async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await prisma.project.findMany();

      if (!projects) {
        res.status(401).json({
          error: "Theres no any project available yet. please create new one",
        });
        return;
      }

      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectName, description, startDate, endDate, userId } = req.body;

      if (!projectName || !description || !userId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const newProject = await prisma.project.create({
        data: {
          projectName,
          description,
          startDate,
          endDate,
          userId,
        },
      });

      res
        .status(201)
        .json({ message: "Project created successfully", project: newProject });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const project = (req as any).project;
      res.status(200).json(project);
    } catch (error) {
      console.error("Error in getProjectById controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const project = (req as any).project;
      const { projectName, description, startDate, endDate } = req.body;

      const updatedProject = await prisma.project.update({
        where: { projectId: project.projectId },
        data: {
          projectName,
          description,
          startDate,
          endDate,
        },
      });

      res
        .status(200)
        .json({ message: "update project successfully", updatedProject });
    } catch (error) {
      console.error("Error in updateProject controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const project = (req as any).project;

      await prisma.project.delete({
        where: { projectId: project.projectId },
      });

      res.status(204).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error in deleteProject controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ProjectController;
