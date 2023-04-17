import express from "express"
import { authRouter } from "./auth"
import { userRouter } from "./users"

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use("/api", router)

export default router
