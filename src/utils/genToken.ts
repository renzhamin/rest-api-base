import jwt from "jsonwebtoken"

export const genAccessToken = (user) => {
    if (!user) return null

    const { id, username, email } = user

    const accessToken = jwt.sign(
        { id, username, email },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "5m",
        }
    )

    return accessToken
}

export const genRefreshToken = (user, tokenId: string) => {
    const { id, username, email } = user
    const expiresIn = user.expire || "30d"

    const refreshToken = jwt.sign(
        { jwtid: tokenId, id, username, email },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn,
        }
    )

    return refreshToken
}
