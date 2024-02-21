import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthMiddleware {
  static validateRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { username, email, password } = req.body;

    // Validate username
    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Invalid username" });
      return;
    }

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }

    // Validate password
    if (!password || typeof password !== "string" || password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
      return;
    }

    // If all validations pass, proceed to the next middleware/controller
    next();
  }

  static async validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email } });

      // Check if the user exists
      if (!user) {
        res.status(401).json({ error: "Invalid email credentials" });
        return;
      }

      // Compare the entered password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid password credentials" });
        return;
      }

      // Attach the user to the request object for later use
      (req as any).user = user;

      next();
    } catch (error) {
      console.error("Error in validateLogin middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static generateToken(user: any): string {
    // You may want to use a more secure secret in a production environment
    const secret = "your_secret_key";

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      secret,
      { expiresIn: "1h" } // Adjust the expiration time as needed
    );

    return token;
  }

  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // You may want to use a more secure secret in a production environment
    const secret = "your_secret_key";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      // Attach the decoded data to the request object for later use
      (req as any).user = decoded;

      next();
    });
  }

  static validateLogout(req: Request, res: Response, next: NextFunction): void {
    // Clear the user from the request object
    (req as any).user = null;
    next();
  }
}

export default AuthMiddleware;
