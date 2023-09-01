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

router.post("/categories", authMiddlewareWithRole("admin"), createCategory)
router.get("/categories", authMiddlewareWithRole("admin"), getAllCategories)
router.get("/categories/:id", authMiddlewareWithRole("admin"), getCategoryById)
router.get(
  "/categories/:id/reports",
  authMiddlewareWithRole("admin"),
  getReportsByCategoryId
)
router.put("/categories/:id", authMiddlewareWithRole("admin"), updateCategory)
router.delete(
  "/categories/:id",
  authMiddlewareWithRole("admin"),
  deleteCategory
)

export default router
