import { createUser } from "../db/users"

export const register = async (req, res) => {
    try {
        const user = await createUser(req.user)
        const data = {
            username: user.username,
            email: user.email,
        }

        res.json({ data })
    } catch (error) {
        res.json({ error: "Registration Failed" })
        console.log(error)
    }
}
