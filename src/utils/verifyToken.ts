import jwt from "jsonwebtoken"
import { tokenExistsInDb } from "../db/tokens"

const tokenVerifier: any = {}

const verifyToken = (token: string, secret) => {
    let user: any = {}
    jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, decoded) => {
        if (err) user.tokenError = err.name
        else user = decoded
    })
    return user
}

tokenVerifier.validateAccessToken = (accessToken: string) => {
    return verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!)
}

tokenVerifier.verifyRefreshToken = (refreshToken: string) => {
    return verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
}

tokenVerifier.validateRefreshToken = async (refreshToken: string) => {
    const user = await tokenVerifier.verifyRefreshToken(refreshToken)

    if (user.tokenError) return user

    const tokenExists = await tokenExistsInDb(user.jwtid, refreshToken)

    if (!tokenExists) user.tokenError = "OldToken"
    return user
}

export default tokenVerifier
