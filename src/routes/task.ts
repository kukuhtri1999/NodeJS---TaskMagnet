// src/routes/task.ts

import express from "express";
import TaskController from "../controllers/taskController";
import AuthMiddleware from "../middlewares/authMiddleware";
import TaskMiddleware from "../middlewares/taskMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewTask:
 *       type: object
 *       required:
 *         - title
 *         - projectId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: The priority of the task
 *         status:
 *           type: string
 *           enum: [ToDo, InProgress, Done]
 *           description: The status of the task
 *         projectId:
 *           type: integer
 *           description: The ID of the project to which the task belongs
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task for a specific project ( you will need to login first, then userId of this task will be bond with your logged in account)
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Project not found
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/",
  AuthMiddleware.verifyToken,
  TaskMiddleware.validateTask,
  TaskController.createTask
);

/**
 * @swagger
 * /task/project/{projectId}:
 *   get:
 *     summary: Get all tasks for a specific project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The ID of the project
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
 *                 $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Project not found
 *       '500':
 *         description: Internal server error
 */
router.get("/project/:projectId", TaskController.getTasksByProjectId);

/**
 * @swagger
 * /task/user/{userId}:
 *   get:
 *     summary: Get all tasks for a specific user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/user/:userId", TaskController.getTasksByUserId);

/**
 * @swagger
 * /task/{taskId}:
 *   get:
 *     summary: Get specific task details by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:taskId", TaskController.getTaskById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date-time
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *         status:
 *           type: string
 *           enum: [ToDo, InProgress, Done]
 */

/**
 * @swagger
 * /task/{taskId}:
 *   put:
 *     summary: Update specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     requestBody:
 *       description: Updated task data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:taskId", TaskController.updateTaskById);

/**
 * @swagger
 * /task/{taskId}:
 *   delete:
 *     summary: Delete specific task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task
 *     responses:
 *       '204':
 *         description: Task deleted successfully
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:taskId", TaskController.deleteTaskById);

export default router;
