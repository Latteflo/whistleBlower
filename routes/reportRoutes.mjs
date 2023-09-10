import express from "express"
import {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getAllReports,
  updateReportMedia,
  getReportsByStatus,
  updateReportStatusById
} from "../controllers/ReportController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"
import { getReportsByPriorityColor } from "../controllers/PriorityController.mjs"
import { generateReportPDF } from "../controllers/PdfGeneratorController.mjs"
const router = express.Router()

// Create a new report
router.post("/create", authMiddleware, createReport)
router.patch("/media/:id", updateReportMedia)
router.get("/all", authMiddlewareWithRole("admin"), getAllReports)
router.get("/:id", authMiddleware, getReportById)
router.get("/priority",authMiddlewareWithRole("admin"), getReportsByPriorityColor)
router.get("/status", authMiddlewareWithRole("admin"), getReportsByStatus)
router.put("/:id", authMiddleware, updateReport)
router.put("/:id/status", authMiddleware, updateReportStatusById)
router.delete("/:id", authMiddleware, deleteReport)
router.post("/:id/pdf", generateReportPDF)

export default router
