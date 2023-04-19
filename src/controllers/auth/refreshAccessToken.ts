import { randomUUID } from "crypto"
import { addRefreshToken, deleteRefreshTokenById } from "../../db/tokens"
import { genAccessToken, genRefreshToken } from "../../utils/genToken"

const rotateRefreshToken = async (user: any) => {
    const newTokenId = randomUUID()
    const newRefreshToken = genRefreshToken(user, newTokenId)
    deleteRefreshTokenById(user.jwtid)
    addRefreshToken(newTokenId, user.id, newRefreshToken!)
    return newRefreshToken
}

export const refreshAccessToken = async (req, res) => {
    const user = req.user

    const newRefreshToken = await rotateRefreshToken(user)
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 * 30,
    })

    const accessToken = genAccessToken(user)
    return res.json({ accessToken })
}
