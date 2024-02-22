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
      const { email, password } = req.body;

      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email } });

      // Check if the user exists
      if (!user) {
        res.status(401).json({ error: "Invalid email credentials" });
        return;
      }

      // Generate a token
      const secret = "abc";
      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        secret,
        {
          expiresIn: "1h",
        }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("token", token, { httpOnly: true });

      // Send a success response
      res.status(200).json({ message: "Successfully logged in", user, token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  static logout(req: Request, res: Response): void {
    try {
      // Clear the token cookie
      res.clearCookie("token");

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
