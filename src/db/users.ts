import { hashString } from "../utils/hashString"
import db from "./connect"

export const findUserByEmail = (email: string) => {
    return db.user.findUnique({
        where: {
            email,
        },
    })
}

export const findUserById = (id: number) => {
    return db.user.findUnique({
        where: {
            id,
        },
    })
}

export const findUserByUsername = (username: string) => {
    return db.user.findUnique({
        where: {
            username,
        },
    })
}

export const findUserByUsernameOrEmail = (username: string, email: string) => {
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

export const getAllUsers = () => {
    return db.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
        },
    })
}
