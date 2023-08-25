import express from "express"
import {
  searchReportsController,
  searchCategoriesController,
} from "../controllers/SearchController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"

const router = express.Router()

// Routes to search reports and categories

/**
 * @swagger
 * /search/reports:
 *   get:
 *     summary: Search reports by query
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             reports:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Report'
 *       500:
 *         description: An error occurred while searching reports
 */
router.get("/search/reports", authMiddleware, searchReportsController)

/**
 * @swagger
 * /search/categories:
 *   get:
 *     summary: Search categories by query
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             categories:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Category'
 *       500:
 *         description: An error occurred while searching categories
 */
router.get("/search/categories", authMiddleware, searchCategoriesController)

export default router
