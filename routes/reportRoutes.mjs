import express from "express"
import {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByPriorityColor,
  getAllReports,
  updateReportStatusController,
} from "../controllers/ReportController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"
import { getClientDashboard } from '../controllers/ClientController.mjs';
import { getAdminDashboard } from "../controllers/AdminController.mjs";

const router = express.Router()
/**
 * @swagger
 * /client/dashboard:
 *   get:
 *     summary: Get client dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client dashboard retrieved successfully
 */
router.get("/client/dashboard", authMiddleware, getClientDashboard)

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard retrieved successfully
 */
router.get("/admin/dashboard", authMiddlewareWithRole("admin"), getAdminDashboard)

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Report created successfully
 */
router.post("/report/create", authMiddleware, createReport)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */
router.get("/report/", authMiddlewareWithRole("admin"), getAllReports)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a specific report by ID
 *     tags: [Reports]
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
 *         description: Report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 */
router.get("/report/:id", authMiddleware, getReportById)

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a report by ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Report ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Report updated successfully
 */
router.put("/report/:id", authMiddleware, updateReport)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a report by ID
 *     tags: [Reports]
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
 *         description: Report deleted successfully
 */
router.delete("/report/:id", authMiddleware, deleteReport)

/**
 * @swagger
 * /priority-color/{color}:
 *   get:
 *     summary: Get reports by priority color
 *     tags: [Reports]
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
 *         description: Reports retrieved successfully
 */
router.get(
  "/report/priority-color/:color",
  authMiddlewareWithRole("admin"),
  getReportsByPriorityColor
)

/**
 * @swagger
 * /reports/{id}/status:
 *   put:
 *     summary: Update report status
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Report ID
 *       - in: body
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: New status
 *     responses:
 *       200:
 *         description: Report status updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *       500:
 *         description: An error occurred while updating the report status
 */
router.put("/report/:id/status", authMiddleware ,updateReportStatusController)

export default router
