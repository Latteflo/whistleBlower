import express from "express"
import {
  searchReportsController,
  searchCategoriesController,
} from "../controllers/SearchController.mjs"
import {
  authMiddleware
} from "../middleware/authMiddleware.mjs"

const router = express.Router()


router.get("/search/reports", authMiddleware, searchReportsController)


router.get("/search/categories", authMiddleware, searchCategoriesController)

export default router
