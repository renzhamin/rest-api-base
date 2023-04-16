import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { addRefreshToken } from "../db/tokens"
import { findUserByUsernameOrEmail } from "../db/users"
import { genAccessToken, genRefreshToken } from "../utils/genToken"

export const login = async (req, res) => {
    try {
        const username = req.body.username || ""
        const password = req.body.password || ""

        const user = await findUserByUsernameOrEmail(username, username).catch(
            (e) => {
                return res.status(404).json({ error: "User Not Found" })
            }
        )

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(401).json({ error: "Wrong Password" })

        const accessToken = genAccessToken(user)
        const tokenId = randomUUID()
        const refreshToken = genRefreshToken(user, tokenId)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 30 * 1000,
        })

        await addRefreshToken(tokenId, user.id, refreshToken)

        return res.json({ accessToken })
    } catch (error) {
        return res.status(404).json({ error: "Internal Error" })
    }
}
