import express from "express"
import {
 createCategoryController as createCategory,
 getAllCategoriesController as getAllCategories,
 getReportsByCategoryIdController as getReportsByCategory,
} from "../controllers/CategoryController.mjs"
import { authMiddlewareWithRole } from "../middleware/authMiddleware.mjs"

const router = express.Router()
router.post(
  "/",
  authMiddlewareWithRole("admin"),
  createCategory  
)
router.get("/", getAllCategories) 

router.get(
  "/:id/reports",
  authMiddlewareWithRole("admin"),
  getReportsByCategory
)

export default router
