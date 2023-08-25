import express from "express"
import {
 createCategory,
 getAllCategories,
 getReportsByCategory,
} from "../controllers/CategoryController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post(
  "/",
  authMiddlewareWithRole("admin"),
  createCategory // Corrected
)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get("/", getAllCategories) // Corrected

/**
 * @swagger
 * /{id}/reports:
 *   get:
 *     summary: Get reports by category ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 */
router.get(
  "/:id/reports",
  authMiddlewareWithRole("admin"),
  getReportsByCategory
)

export default router
