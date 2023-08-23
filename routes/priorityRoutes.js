const express = require('express');
const router = express.Router();
const PriorityController = require('../controllers/PriorityController');
const { authMiddlewareWithRole } = require('../middleware/authMiddleware');

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
router.get('/', authMiddlewareWithRole('admin'), PriorityController.getAllPriorities);

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
router.get('/queries/:color', authMiddlewareWithRole('admin'), PriorityController.getQueriesByColor);

module.exports = router;
