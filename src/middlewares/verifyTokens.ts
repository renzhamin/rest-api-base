import { validateAccessToken, validateRefreshToken } from "../utils/verifyToken"

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    const user = validateAccessToken(token)
    if (!user) return res.status(401).json({ error: "Invalid Access token" })

    req.user = user
    return next()
}

export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return res.status(401).json({ error: "No refresh token" })

    const user = await validateRefreshToken(refreshToken)

    if (!user) return res.status(401).json({ error: "Invalid Refresh Token" })
    req.user = user

    return next()
}
