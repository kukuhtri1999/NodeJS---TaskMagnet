// src/routes/label.ts

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import LabelController from "../controllers/labelController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Label
 *   description: API endpoints for managing labels.
 */

/**
 * @swagger
 * /label:
 *   get:
 *     summary: Get all labels.
 *     tags: [Label]
 *     responses:
 *       200:
 *         description: Successful response with an array of labels.
 *       500:
 *         description: Internal server error.
 */
router.get("/", LabelController.getAllLabels);

/**
 * @swagger
 * /label:
 *   post:
 *     summary: Create a new label related to a task
 *     tags: [Label]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               labelName:
 *                 type: string
 *               taskId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Label created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", LabelController.createLabel);

export default router;
