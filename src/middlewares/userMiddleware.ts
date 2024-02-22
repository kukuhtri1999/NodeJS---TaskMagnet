import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "./authMiddleware";

const prisma = new PrismaClient();

export class UserMiddleware {
  static async validateUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthMiddleware.verifyToken(req, res, async () => {
        const userId = parseInt(req.params.id, 10);
        const { firstName, lastName, email, username } = req.body;

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { userId } });

        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        if (!firstName || !lastName || !email || !username) {
          throw new Error("Missing parameter");
        }

        // Attach the user to the request object for later use
        (req as any).profileUser = user;

        next();
      });
    } catch (error) {
      console.error("Error in validateUserProfile middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async validateChangePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdFromToken = (req as any).user.userId; // Get user ID from decoded token
      const userIdFromRequest = parseInt(req.params.id, 10); // Parse user ID from request URL

      if (userIdFromToken !== userIdFromRequest) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      next();
    } catch (error) {
      console.error("Error in validateChangePassword middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
