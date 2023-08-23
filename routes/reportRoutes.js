const express = require("express")
const router = express.Router()
const ReportController = require("../controllers/ReportController")
const { authMiddleware } = require("../middleware/authMiddleware")
const { authMiddlewareWithRole } = require('../middleware/authMiddleware');

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
router.post("/create", authMiddleware, ReportController.createReport)

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
router.get("/", authMiddleware, ReportController.getAllReports)

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
router.get("/:id", authMiddleware, ReportController.getReportById)

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
router.put("/:id", authMiddleware, ReportController.updateReport)

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
router.delete("/:id", authMiddleware, ReportController.deleteReport)

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
  ReportController.getReportsByPriorityColor
)

module.exports = router
