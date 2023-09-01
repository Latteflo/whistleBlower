import express from "express"
import {
  register,
  login,
  registerAdmin,
  profile,
} from "../controllers/UserController.mjs"
import {
  authMiddleware,
  authMiddlewareWithRole,
} from "../middleware/authMiddleware.mjs"
import { getClientDashboard } from "../controllers/ClientController.mjs"
import { getAdminDashboard } from "../controllers/AdminController.mjs"

const router = express.Router()

router.post("/register", register)


router.post("/login", login)


router.post("/register-admin", registerAdmin)


router.get("/profile", authMiddleware, profile)


router.get("/client/dashboard", authMiddleware, getClientDashboard)


router.get(
  "/admin/dashboard",
  authMiddlewareWithRole("admin"),
  getAdminDashboard
)

export default router
