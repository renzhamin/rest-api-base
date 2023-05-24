import express from "express"
import { getPassResetLink, getPassResetPage } from "../controllers/passReset"
import { passReset } from "../controllers/passReset"
import { verifyPasswordResetToken } from "../middlewares/verifyTokens"

const router = express.Router()

router.get("/", getPassResetLink)
router.get("/:userId/:token", getPassResetPage)
router.post("/:userId/:token", verifyPasswordResetToken, passReset)

export { router as passResetRouter }
