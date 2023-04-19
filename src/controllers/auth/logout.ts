import { deleteAllRefreshTokens, deleteRefreshTokenById } from "../../db/tokens"
import tokenVerifier from "../../utils/verifyToken"

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return res.status(401).json({ error: "No Refresh Token" })

    // does not check if it exists in the db
    const user = tokenVerifier.verifyRefreshToken(refreshToken)

    if (user.tokenError)
        return res.status(401).json({
            error: "Invalid Refresh token",
            tokenError: user.tokenError,
        })

    res.clearCookie("refreshToken")
    deleteRefreshTokenById(user.jwtid)
    return res.sendStatus(200)
}

export const logout_all = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
        return res.status(401).json({ error: "No Refresh Token" })

    res.clearCookie("refreshToken")

    // does not check if it exists in the db
    const user = tokenVerifier.verifyRefreshToken(refreshToken)

    if (user.tokenError)
        return res.status(401).json({
            error: "Invalid Refresh token",
            tokenError: user.tokenError,
        })

    // delete all tokens associated with this user
    deleteAllRefreshTokens(user.id)
    return res.sendStatus(200)
}
