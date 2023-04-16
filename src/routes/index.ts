import express from "express"
import { login } from "../auth/login"
import { validateRegistrationData } from "../middlewares/validateRegistrationData"
import { register } from "../auth/register"
import { refreshAccessToken } from "../auth/refreshAccessToken"
import {
    verifyAccessToken,
    verifyRefreshToken,
} from "../middlewares/verifyTokens"
import { logout, logout_all } from "../auth/logout"
import { listUsers } from "./users"

const authRouter = express.Router()

authRouter.post("/auth/login", login)
authRouter.post("/auth/register", validateRegistrationData, register)
authRouter.get("/auth/refresh", verifyRefreshToken, refreshAccessToken)
authRouter.delete("/auth/logout", logout)
authRouter.delete("/auth/logout_all", logout_all)

const router = express.Router()

router.use(authRouter)
router.use("/users", verifyAccessToken, listUsers)

router.use("/api", router)

export default router
