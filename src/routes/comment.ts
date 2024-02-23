// src/routes/CommentRoutes.ts

import express from "express";
import CommentController from "../controllers/commentController";
import AuthMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API for managing comments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         taskId:
 *           type: integer
 *           description: ID of the task associated with the comment
 *         comment:
 *           type: string
 *           description: Comment text
 */

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment ( you will need to login first, then userId of this comment will be related with your logged in account)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", AuthMiddleware.verifyToken, CommentController.createComment);

/**
 * @swagger
 * /comment/user/{userId}:
 *   get:
 *     summary: Get all comments related to a specific user
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/user/:userId", CommentController.getCommentsByUserId);

/**
 * @swagger
 * /comment/task/{taskId}:
 *   get:
 *     summary: Get all comments related to a specific task
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.get("/task/:taskId", CommentController.getCommentsByTaskId);

/**
 * @swagger
 * /comment/{commentId}:
 *   get:
 *     summary: Get specific comment details by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:commentId", CommentController.getCommentById);

/**
 * @swagger
 * /comment/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         description: Updated comment data
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             example:
 *               updatedComment:
 *                 commentId: 1
 *                 taskId: 1
 *                 userId: 1
 *                 comment: Updated Comment
 *                 createdAt: 2024-02-21T00:00:00.000Z
 *                 updatedAt: 2024-02-21T00:00:00.000Z
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:commentId", CommentController.updateCommentById);

/**
 * @swagger
 * /comment/{commentId}:
 *   delete:
 *     summary: Delete specific comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:commentId", CommentController.deleteCommentById);

export default router;
