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

  static validateLogin = [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required"),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Add a 'user' property to the request
        (req as Request & { user?: any }).user = user;

        next();
      } catch (error) {
        console.error("Error validating login:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  ];
}

export default AuthMiddleware;
