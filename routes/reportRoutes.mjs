import express from "express"
import {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByPriorityColor,
  getAllReports,
  getDropboxUploadUrl,
  updateReportStatusController,
} from "../controllers/ReportController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"
import { updateReportMediaController } from "../controllers/ReportController.mjs";


const router = express.Router()

router.post("/create", authMiddleware, createReport);
router.put('/update-media', updateReportMediaController);
router.get("/create-upload-url", authMiddleware, getDropboxUploadUrl);
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

export default router
