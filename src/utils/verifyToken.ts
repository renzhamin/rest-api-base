import jwt from "jsonwebtoken"
import { tokenExistsInDb } from "../db/tokens"

export const validateAccessToken = (accessToken: string) => {
    let user: any = null
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
        (err, decoded) => {
            if (err) return null
            user = decoded
        }
    )
    return user
}

export const validateRefreshToken = async (refreshToken: string) => {
    let user: any = null
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err, decoded) => {
            if (err) return null
            user = decoded
        }
    )

    if (!user) return null

    const tokenExists = await tokenExistsInDb(user.jwtid, refreshToken)

    if (!tokenExists) return null
    return user
}
