const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authMiddlewareWithRole } = require('../middleware/authMiddleware');

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
router.post('/', authMiddlewareWithRole('admin'), CategoryController.createCategory);

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
router.get('/', CategoryController.getAllCategories);

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
router.get('/:id/reports', authMiddlewareWithRole('admin'), CategoryController.getReportsByCategory);

module.exports = router;
