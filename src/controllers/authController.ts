import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

  static login = async (req: Request & { user?: any }, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(500).json({ message: "Internal server error" });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "1h", // You can customize the expiration time
        }
      );

      // Save token to the database
      await prisma.token.create({
        data: {
          token,
          userId: user.userId,
          expiresAt: new Date(Date.now() + 3600000), // 1 hour in milliseconds
        },
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default AuthController;
