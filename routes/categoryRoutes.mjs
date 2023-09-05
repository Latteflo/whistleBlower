import express from "express"
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getReportsByCategoryId,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"
const router = express.Router();

router.post("/create", authMiddlewareWithRole("admin"), createCategory)
router.get("/get-all", authMiddlewareWithRole("admin"), getAllCategories)
router.get("/:id", authMiddlewareWithRole("admin"), getCategoryById)
router.get("/:id/reports",authMiddlewareWithRole("admin"),getReportsByCategoryId)
router.put("/:id", authMiddlewareWithRole("admin"), updateCategory)
router.delete("/:id",authMiddlewareWithRole("admin"),deleteCategory)

export default router
