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

  static async getLabelById(req: Request, res: Response): Promise<void> {
    try {
      const labelId = parseInt(req.params.labelId, 10);

      // Get label by ID
      const label = await prisma.label.findUnique({
        where: {
          labelId,
        },
      });

      if (!label) {
        res.status(404).json({ error: "Label not found" });
        return;
      }

      res.status(200).json(label);
    } catch (error) {
      console.error("Error fetching label:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async updateLabelById(req: Request, res: Response): Promise<void> {
    try {
      const labelId = parseInt(req.params.labelId, 10);
      const { labelName } = req.body;

      // Update label by ID
      const updatedLabel = await prisma.label.update({
        where: {
          labelId,
        },
        data: {
          labelName,
        },
      });

      res
        .status(200)
        .json({ message: "Label updated successfully", label: updatedLabel });
    } catch (error) {
      console.error("Error updating label:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async deleteLabelById(req: Request, res: Response): Promise<void> {
    try {
      const labelId = parseInt(req.params.labelId, 10);

      // Delete related TaskLabel records
      await prisma.taskLabel.deleteMany({
        where: {
          labelId,
        },
      });

      // Delete label by ID
      await prisma.label.delete({
        where: {
          labelId,
        },
      });

      res.status(200).json({ message: "Label deleted successfully" });
    } catch (error) {
      console.error("Error deleting label:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default LabelController;
