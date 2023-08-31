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
import multer from "multer"
import { upload } from "../config/storageConfig.mjs"

const router = express.Router()

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
router.post("/create", authMiddleware, (req, res, next) => {
  upload.single('media')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
}, createReport);

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
router.get("/", authMiddlewareWithRole("admin"), getAllReports)

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
router.get("/:id", authMiddleware, getReportById)

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
router.put("/:id", authMiddleware, updateReport)

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
router.delete("/:id", authMiddleware, deleteReport)

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
  "/priority-color/:color",
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
router.put("/:id/status", authMiddleware, updateReportStatusController)

export default router
