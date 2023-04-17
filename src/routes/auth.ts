import express from "express"
import { login } from "../controllers/auth/login"
import { logout, logout_all } from "../controllers/auth/logout"
import { refreshAccessToken } from "../controllers/auth/refreshAccessToken"
import { register } from "../controllers/auth/register"
import { validateRegistrationData } from "../middlewares/validateRegistrationData"
import { verifyRefreshToken } from "../middlewares/verifyTokens"

const router = express.Router()

router.post("/auth/login", login)
router.post("/auth/register", validateRegistrationData, register)
router.get("/auth/refresh", verifyRefreshToken, refreshAccessToken)
router.delete("/auth/logout", logout)
router.delete("/auth/logout_all", logout_all)

export { router as authRouter }
