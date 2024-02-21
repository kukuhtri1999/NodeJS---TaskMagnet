"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns a list of tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/tasks", (req, res) => {
    res.status(200).send("List of tasks");
});
exports.default = router;
