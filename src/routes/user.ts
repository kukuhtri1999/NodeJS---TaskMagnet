import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserMiddleware } from "../middlewares/userMiddleware";
import AuthMiddleware from "../middlewares/authMiddleware";

const userRouter: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Data manipulations endpoints
 */

/**
 * @swagger
 * /user/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       404:
 *         description: User not found
 */
userRouter.get(
  "/profile/:id",
  UserMiddleware.validateUserProfile,
  UserController.getProfile
);

/**
 * @swagger
 * /user/profile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put(
  "/profile/:id",
  UserMiddleware.validateUserProfile,
  UserController.updateProfile
);

/**
 * @swagger
 * /user/profile/{id}:
 *   delete:
 *     summary: Delete user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
userRouter.delete(
  "/profile/:id",
  AuthMiddleware.verifyToken,
  UserController.deleteUserProfile
);

/**
 * @swagger
 * /user/change-password/{id}:
 *   put:
 *     summary: Change user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized, invalid old password
 *       500:
 *         description: Internal server error
 */
userRouter.put(
  "/change-password/:id",
  AuthMiddleware.verifyToken,
  UserController.changePassword
);

export default userRouter;
