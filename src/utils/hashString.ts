import bcrypt from "bcrypt"

export const hashString = async (str: string) => {
    const salt = await bcrypt.genSalt()
    const hashedStr = await bcrypt.hash(str, salt)
    return hashedStr
}
