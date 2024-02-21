import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns a list of tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/tasks", (req: Request, res: Response) => {
  res.status(200).send("List of tasks");
});

export default router;
