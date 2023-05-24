import { hashString } from "../utils/hashString"
import db from "./connect"

export const findUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: {
            email,
        },
    })
}

export const findUserById = async (id: string) => {
    return db.user.findUnique({
        where: {
            id,
        },
    })
}

export const findUserByUsername = async (username: string) => {
    return db.user.findUnique({
        where: {
            username,
        },
    })
}

export const findUserByUsernameOrEmail = async (
    username: string,
    email: string
) => {
    return db.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
    })
}

export const createUser = async (user: any) => {
    user.password = await hashString(user.password)

    return db.user.create({
        data: user,
    })
}

export const getAllUsers = async () => {
    return db.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
        },
    })
}

export const updatePassword = async (userId: string, newPassword: string) => {
    const password = await hashString(newPassword)
    return db.user.update({
        where: { id: userId },
        data: { password: password },
    })
}
