import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthMiddleware from "../middlewares/authMiddleware";

const prisma = new PrismaClient();

class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, firstName, lastName } = req.body;

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

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const token = AuthMiddleware.generateToken((req as any).user); // Access user from the request object

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error in login controller:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static logout(req: Request, res: Response): void {
    // Clear the token from client-side (e.g., remove it from cookies or localStorage)
    res.clearCookie("token"); // If you're using cookies
    // or
    // localStorage.removeItem("token"); // If you're using localStorage

    res.status(200).json({ message: "Logout successful" });
  }
}

export default AuthController;
