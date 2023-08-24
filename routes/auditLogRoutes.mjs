import express from "express"
import {
  createAuditLogController as createAuditLog,
  getAuditLogsByReportController as getAuditLogsByReport,
} from "../controllers/AuditLogController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new audit log
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               reportId:
 *                 type: integer
 *               action:
 *                 type: string
 *     responses:
 *       201:
 *         description: Audit log created successfully
 */
router.post("/", authMiddlewareWithRole("admin"), createAuditLog)

/**
 * @swagger
 * /{id}/logs:
 *   get:
 *     summary: Get audit logs by report ID
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 */
router.get("/:id/logs", authMiddlewareWithRole("admin"), getAuditLogsByReport)

export default router
