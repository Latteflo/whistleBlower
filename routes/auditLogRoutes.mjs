import express from "express"
import {
  createAuditLogController as createAuditLog,
  getAuditLogsByReport as getAuditLogsByReport
} from "../controllers/AuditLogController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()

router.post("/", authMiddlewareWithRole("admin"), createAuditLog)
router.get("/:id/logs", authMiddlewareWithRole("admin"), getAuditLogsByReport)

export default router
