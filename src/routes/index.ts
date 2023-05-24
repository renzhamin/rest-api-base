import express from "express"
import { authRouter } from "./auth"
import { userRouter } from "./users"
import { passResetRouter } from "./passReset"

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use("/pass-reset", passResetRouter)
router.use("/api", router)

export default router
