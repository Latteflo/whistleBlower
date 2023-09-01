import express from "express";
import {
  initializePriorities,
  getAllPriorities,
  getReportsByPriorityColor,
  getReportsByPriorityId
} from "../controllers/PriorityController.mjs";
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/priorities/initialize", authMiddlewareWithRole("admin"), initializePriorities);
router.get("/priorities", authMiddlewareWithRole("admin"), getAllPriorities);
router.get("/priorities/reports/color/:color", authMiddlewareWithRole("admin"), getReportsByPriorityColor);
router.get("/priorities/reports/id/:id", authMiddlewareWithRole("admin"), getReportsByPriorityId);

export default router;
