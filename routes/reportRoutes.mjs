import express from "express"
import {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getAllReports,
  updateReportStatusController,
  getReportsByStatus,
  updateReportMediaController,
} from "../controllers/ReportController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"
import { getReportsByPriorityColor } from "../controllers/PriorityController.mjs"

const router = express.Router()

// Create a new report
router.post("/", authMiddleware, createReport)
router.patch("/media/:id", updateReportMediaController)
router.get("/", authMiddlewareWithRole("admin"), getAllReports)
router.get("/:id", authMiddleware, getReportById)
router.put("/:id", authMiddleware, updateReport)
router.delete("/:id", authMiddleware, deleteReport)
router.get(
  "/priority-color/:color",
  authMiddlewareWithRole("admin"),
  getReportsByPriorityColor
)
router.put("/:id/status", authMiddleware, updateReportStatusController)
router.get("/status", authMiddlewareWithRole("admin"), getReportsByStatus)

export default router
