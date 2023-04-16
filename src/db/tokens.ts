import { hashString } from "../utils/hashString"
import db from "./connect"
import bcrypt from "bcrypt"

// All async calls

export function findRefreshTokenById(id: string) {
    return db.refreshToken.findUnique({
        where: {
            id,
        },
    })
}

export function deleteRefreshTokenById(id: string) {
    return db.refreshToken.delete({
        where: {
            id,
        },
    })
}

export async function addRefreshToken(
    id: string,
    userId: number,
    refreshToken: string
) {
    const hashedToken = await hashString(refreshToken)
    return db.refreshToken.create({
        data: {
            id,
            userId,
            hashedToken,
        },
    })
}

export async function tokenExistsInDb(id: string, refreshToken: string) {
    const tokenFromDB = await findRefreshTokenById(id)
    const match =
        tokenFromDB &&
        (await bcrypt.compare(refreshToken, tokenFromDB.hashedToken))

    return match
}
