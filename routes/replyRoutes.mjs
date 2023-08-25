import express from 'express';
import {
  createReplyController as createReply,
  getReplyByIdController as getReplyById,
  updateReplyController as updateReply,
  deleteReplyController as deleteReply,
} from '../controllers/ReplyController.mjs';
import { authMiddleware } from '../middleware/authMiddleware.mjs';

const router = express.Router();

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
router.post('/reply/', authMiddleware, createReply);

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
router.get('/reply/:reportId', authMiddleware, getReplyById);

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
router.put('/reply/:id', authMiddleware, updateReply);

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
router.delete('/reply/:id', authMiddleware, deleteReply);

export default router;
