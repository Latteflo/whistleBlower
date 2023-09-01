import express from "express"
import {
  searchReports,
  searchCategories,
} from "../controllers/SearchController.mjs"
import { authMiddleware } from "../middleware/authMiddleware.mjs"

const router = express.Router()

router.get("/search/reports", authMiddleware, searchReports)
router.get("/search/categories", authMiddleware, searchCategories)

export default router
