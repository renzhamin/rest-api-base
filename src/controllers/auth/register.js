import { createUser } from "../../db/users"

export const register = async (req, res) => {
    const user = await createUser(req.user)
    if (!user) return res.json({ error: "Registration Failed" })

    const data = {
        username: user.username,
        email: user.email,
    }

    res.json({ data })
}
