import { hashString } from "../utils/hashString"
import db from "./connect"
import bcrypt from "bcrypt"

// All async calls

export const findRefreshTokenById = async (id: string) => {
    return db.refreshToken.findUnique({
        where: {
            id,
        },
    })
}

export const deleteRefreshTokenById = async (id: string) => {
    return db.refreshToken.delete({
        where: {
            id,
        },
    })
}

export const deleteAllRefreshTokens = async (id: string) => {
    return db.refreshToken.deleteMany({
        where: {
            user: {
                id,
            },
        },
    })
}

export const addRefreshToken = async (
    id: string,
    userId: string,
    refreshToken: string
) => {
    const hashedToken = await hashString(refreshToken)
    return db.refreshToken.create({
        data: {
            id,
            userId,
            hashedToken,
        },
    })
}

export const tokenExistsInDb = async (id: string, refreshToken: string) => {
    const tokenFromDB = await findRefreshTokenById(id)
    const match =
        tokenFromDB &&
        (await bcrypt.compare(refreshToken, tokenFromDB.hashedToken))

    return match
}
