// src/controllers/LabelController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LabelController {
  static async getAllLabels(req: Request, res: Response): Promise<void> {
    try {
      const labels = await prisma.label.findMany();
      res.status(200).json(labels);
    } catch (error) {
      console.error("Error fetching labels:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async createLabel(req: Request, res: Response): Promise<void> {
    try {
      const { labelName, taskId } = req.body;

      // Create a new label
      const newLabel = await prisma.label.create({
        data: {
          labelName,
          taskLabels: {
            create: {
              taskId,
            },
          },
        },
      });

      res
        .status(201)
        .json({ message: "Label created successfully", label: newLabel });
    } catch (error) {
      console.error("Error creating label:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default LabelController;
