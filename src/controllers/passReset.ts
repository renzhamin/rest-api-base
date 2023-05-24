import { findUserByEmail, updatePassword } from "../db/users"
import { genPassResetToken } from "../utils/genToken"
import sendEmail from "../utils/sendEmail"

export const passReset = async (req, res) => {
    try {
        const { password } = req.body
        if (!password) return res.send("Password not provided")
        updatePassword(req.params.userId, password)
        res.json({ msg: "Password Reset Successfull" })
    } catch (error) {
        res.status(404).send("Failed to reset password")
    }
}

export const getPassResetPage = (req, res) => {
    const { userId, token } = req.params

    res.send(`<form action="/api/pass-reset/${userId}/${token}" method="POST">
             <input type="password" name="password" value="" placeholder="Enter your new password..." /> 
             <input type="submit" value="Reset Password" />
             </form>`)
}

export const getPassResetLink = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ msg: "No email provided" })
        }
        const user = await findUserByEmail(req.body.email)
        if (!user || !user.email) return res.json({ msg: "Email not found" })
        const token = genPassResetToken(user)
        const url = req.protocol + "://" + req.get("host") + req.originalUrl
        const resetLink = `<a target='_blank' href='${url}/${user.id}/${token}'>Password Reset Link</a>`
        res.send(resetLink)
        /* sendEmail(req.body.email, "Reset Password", resetLink) */
        /* res.json({ msg: "Password Reset Link sent to email" }) */
    } catch (error) {
        res.status(500).json({ msg: "Failed to send email" })
    }
}
