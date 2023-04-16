import { getAllUsers } from "../db/users"

export const listUsers = async (req, res) => {
    const users = await getAllUsers()
    res.json({ users })
}
