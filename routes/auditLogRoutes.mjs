import express from "express"
import {
  createAuditLog,
  getAuditLogsByReportId,
} from "../controllers/AuditLogController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()

router.post("/", authMiddlewareWithRole("admin"), createAuditLog)
router.get("/:id/logs", authMiddlewareWithRole("admin"), getAuditLogsByReportId)

export default router
