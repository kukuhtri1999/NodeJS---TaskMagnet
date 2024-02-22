import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profileUser = (req as any).profileUser;

      res.status(200).json({ profileUser });
    } catch (error) {
      console.error("Error in getProfile controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const { username, email, firstName, lastName } = req.body;

      // Check if the logged-in user matches the requested user
      if ((req as any).user.userId !== userId) {
        res.status(401).json({
          error: "Unauthorized : you're not the owner of this content/account.",
        });
        return;
      }

      // Check if the username or email already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        res.status(400).json({ message: "Username or email already exists" });
        return;
      }

      // Update the user profile
      const updatedUser = await prisma.user.update({
        where: { userId },
        data: { firstName, lastName },
      });

      res
        .status(200)
        .json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
      console.error("Error in updateProfile controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);

      // Check if the logged-in user matches the requested user
      if ((req as any).user.userId !== userId) {
        res.status(401).json({
          error: "Unauthorized : you're not the owner of this content/account.",
        });
        return;
      }

      res.clearCookie("token");

      // Perform deletion in the database
      await prisma.user.delete({
        where: { userId },
      });

      res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
      console.error("Error during user profile deletion:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const { oldPassword, newPassword } = req.body;

      // Check if the logged-in user matches the requested user
      if ((req as any).user.userId !== userId) {
        res.status(401).json({
          error: "Unauthorized : you're not the owner of this content/account.",
        });
        return;
      }

      const user = await prisma.user.findUnique({ where: { userId } });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Check if the old password is correct
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid old password" });
        return;
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await prisma.user.update({
        where: { userId },
        data: { password: hashedNewPassword },
      });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
