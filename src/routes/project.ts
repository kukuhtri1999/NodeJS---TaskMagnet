// src/routes/project.ts

import express, { Router } from "express";
import ProjectController from "../controllers/projectController";
import ProjectMiddleware from "../middlewares/projectMiddleware";

const projectRouter: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project-related endpoints
 */

/**
 * @swagger
 * /project:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects
 *       500:
 *         description: Internal server error
 */
projectRouter.get(
  "/",
  ProjectMiddleware.validateGetAllProjects,
  ProjectController.getAllProjects
);

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The name of the project (text field)
 *               description:
 *                 type: string
 *                 description: The project description (text field)
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the project (date field)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the project (date field)
 *               userId:
 *                 type: integer
 *                 description: The ID of the user associated with the project
 *             required:
 *               - projectName
 *               - userId
 *     responses:
 *       201:
 *         description: Successfully created a new project
 *       500:
 *         description: Internal server error
 */
projectRouter.post(
  "/",
  ProjectMiddleware.validateCreateProject,
  ProjectController.createProject
);

/**
 * @swagger
 * /project /{projectId}:
 *   get:
 *     summary: Get project details by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to get details for
 *     responses:
 *       200:
 *         description: Successfully retrieved project details
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectRouter.get(
  "/:projectId",
  ProjectMiddleware.validateGetProjectById,
  ProjectController.getProjectById
);

/**
 * @swagger
 * /project/{projectId}:
 *   put:
 *     summary: Update project details by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The name of the project
 *               description:
 *                 type: string
 *                 description: The project description
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the project (YYYY-MM-DD)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the project (YYYY-MM-DD)
 *             required:
 *               - projectName
 *     responses:
 *       200:
 *         description: Successfully updated project details
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectRouter.put(
  "/:projectId",
  ProjectMiddleware.validateUpdateProject,
  ProjectController.updateProject
);

/**
 * @swagger
 * /project/{projectId}:
 *   delete:
 *     summary: Delete project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       204:
 *         description: Successfully deleted project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
projectRouter.delete(
  "/:projectId",
  ProjectMiddleware.validateDeleteProject,
  ProjectController.deleteProject
);

export default projectRouter;
