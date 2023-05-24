import { randomUUID } from "crypto"
import jwt from "jsonwebtoken"

export const genToken = (
    user,
    secret: string,
    expiresIn: string,
    tokenId?: string
) => {
    const { id, username, email } = user
    const jwtid = tokenId || randomUUID()
    const token = jwt.sign({ jwtid, id, username, email }, secret, {
        algorithm: "HS256",
        expiresIn,
    })

    return token
}

export const genAccessToken = (user) => {
    return genToken(user, process.env.ACCESS_TOKEN_SECRET!, "5m")
}

export const genRefreshToken = (user, tokenId: string) => {
    return genToken(user, process.env.REFRESH_TOKEN_SECRET!, "30d", tokenId)
}

export const genPassResetToken = (user) => {
    return genToken(user, process.env.PASS_RESET_TOKEN_SECRET!, "2m")
}
