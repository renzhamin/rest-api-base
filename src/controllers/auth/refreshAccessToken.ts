import { randomUUID } from "crypto"
import { addRefreshToken, deleteRefreshTokenById } from "../../db/tokens"
import { genAccessToken, genRefreshToken } from "../../utils/genToken"

export const refreshAccessToken = async (req, res) => {
    const user = req.user
    const newTokenId = randomUUID()
    const newRefreshToken = genRefreshToken(user, newTokenId)

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 * 30,
    })

    // refresh token rotation
    deleteRefreshTokenById(user.jwtid)
    addRefreshToken(newTokenId, user.id, newRefreshToken)
    //

    const accessToken = genAccessToken(user)
    return res.json({ accessToken })
}
