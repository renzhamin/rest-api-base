import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { addRefreshToken } from "../../db/tokens"
import { findUserByUsernameOrEmail } from "../../db/users"
import { genAccessToken, genRefreshToken } from "../../utils/genToken"

export const login = async (req, res) => {
    try {
        if (!req.body.username)
            return res.status(400).json({ error: "No Username provided" })
        if (!req.body.password)
            return res.status(400).json({ error: "No Password provided" })

        const { username, password } = req.body

        // User can log in with username or email
        const user = await findUserByUsernameOrEmail(username, username)

        if (!user) return res.status(404).json({ error: "User Not Found" })

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(401).json({ error: "Wrong Password" })

        const accessToken = genAccessToken(user)
        const tokenId = randomUUID()
        const refreshToken = genRefreshToken(user, tokenId)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 30 * 1000, // 30 days
        })

        // add the token to the database
        addRefreshToken(tokenId, user.id, refreshToken)

        return res.json({ accessToken })
    } catch (error) {
        return res.status(500).json({ error: "Internal Error" })
    }
}
