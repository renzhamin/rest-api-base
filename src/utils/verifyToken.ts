import jwt from "jsonwebtoken"
import { tokenExistsInDb } from "../db/tokens"

const tokenVerifier: any = {}

tokenVerifier.validateAccessToken = (accessToken: string) => {
    let user: any = {}
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
        { algorithms: ["HS256"] },
        (err, decoded) => {
            if (err) user.tokenError = err.name
            else user = decoded
        }
    )
    return user
}

tokenVerifier.verifyRefreshToken = (refreshToken: string) => {
    let user: any = {}
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        { algorithms: ["HS256"] },
        (err, decoded) => {
            if (err) user.tokenError = err.name
            else user = decoded
        }
    )
    return user
}

tokenVerifier.validateRefreshToken = async (refreshToken: string) => {
    const user = await tokenVerifier.verifyRefreshToken(refreshToken)

    if (user.tokenError) return user

    const tokenExists = await tokenExistsInDb(user.jwtid, refreshToken)

    if (!tokenExists) user.tokenError = "OldToken"
    return user
}

export default tokenVerifier
