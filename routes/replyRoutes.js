const express = require('express');
const router = express.Router();
const ReplyController = require('../controllers/ReplyController');
const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new reply
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reply'
 *     responses:
 *       201:
 *         description: Reply created successfully
 */
router.post('/', authMiddleware, ReplyController.createReply);

/**
 * @swagger
 * /{reportId}:
 *   get:
 *     summary: Get all replies by report ID
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reportId
 *         in: path
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Replies retrieved successfully
 */
router.get('/:reportId', authMiddleware, ReplyController.getReplyById);


/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a reply by ID
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Reply ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reply'
 *     responses:
 *       200:
 *         description: Reply updated successfully
 */
router.put('/:id', authMiddleware, ReplyController.updateReply);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a reply by ID
 *     tags: [Replies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Reply ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 */
router.delete('/:id', authMiddleware, ReplyController.deleteReply);


module.exports = router;
