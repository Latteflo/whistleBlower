import express from "express"
import {
  getAllPriorities,
  getQueriesByColor,
} from "../controllers/PriorityController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all priorities
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of priorities
 */
router.get("/", authMiddlewareWithRole("admin"), getAllPriorities)

/**
 * @swagger
 * /queries/{color}:
 *   get:
 *     summary: Get all queries by priority color
 *     tags: [Priorities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: color
 *         in: path
 *         required: true
 *         description: Priority color code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of queries with the specified priority color
 */
router.get(
  "/queries/:color",
  authMiddlewareWithRole("admin"),
  getQueriesByColor
)

export default router
