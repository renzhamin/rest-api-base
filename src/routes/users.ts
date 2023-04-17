import express from "express"

import { verifyAccessToken } from "../middlewares/verifyTokens"
import { listUsers } from "../controllers/users"

const router = express.Router()

router.use("/users", verifyAccessToken, listUsers)

export { router as userRouter }
