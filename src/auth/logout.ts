import jwt from "jsonwebtoken"
import { deleteRefreshTokenById } from "../db/tokens"

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return res.status(401).json({ error: "No Refresh Token" })
    res.clearCookie("refreshToken")
    const user: any = jwt.decode(refreshToken)

    if (user) {
        await deleteRefreshTokenById(user.jwtid)
        return res.sendStatus(200)
    }

    return res.status(401).json({ error: "Invalid Refresh Token" })
}
