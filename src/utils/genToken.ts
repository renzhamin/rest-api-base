import jwt from "jsonwebtoken"

export const genAccessToken = (user) => {
    const { id, username, email } = user

    const accessToken = jwt.sign(
        { id, username, email },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            algorithm: "HS256",
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
            algorithm: "HS256",
            expiresIn,
        }
    )

    return refreshToken
}
