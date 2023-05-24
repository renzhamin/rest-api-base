import tokenVerifier from "../utils/verifyToken"

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    const user = tokenVerifier.validateAccessToken(token)
    if (user.tokenError)
        return res.status(401).json({
            error: "Invalid Access token",
            tokenError: user.tokenError,
        })

    req.user = user
    return next()
}

export const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return res.status(401).json({ error: "No refresh token" })

    const user = await tokenVerifier.validateRefreshToken(refreshToken)

    if (user.tokenError)
        return res.status(401).json({
            error: "Invalid Refresh Token",
            tokenError: user.tokenError,
        })

    req.user = user

    return next()
}

export const verifyPassResetToken = (req, res, next) => {
    const token = req.params.token
    if (token == null) return res.send(401).json({ error: "No token provided" })
    const user = tokenVerifier.validatePassResetToken(token)
    if (user.tokenError)
        return res.status(401).json({
            error: "Invalid Password Reset token",
            tokenError: user.tokenError,
        })

    req.user = user
    return next()
}
