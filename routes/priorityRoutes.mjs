import express from "express"
import {
  initializePriorities,
  getAllPriorities,
  getReportsByPriorityColor,
  getReportsByPriorityId
} from "../controllers/PriorityController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"
const router = express.Router()

router.post("/priority", authMiddlewareWithRole ("admin"), initializePriorities)
router.get("/all", authMiddlewareWithRole("admin"), getAllPriorities)
router.get("/color", authMiddlewareWithRole("admin") ,getReportsByPriorityColor )
router.get("/report/id", authMiddlewareWithRole("admin"), getReportsByPriorityId)

export default router
