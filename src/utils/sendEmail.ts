import nodemailer from "nodemailer"

const sendEmail = async (receiverEmail, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.serviceEmail,
            pass: process.env.serviceEmailPassword,
        },
    })

    const mailOptions = {
        from: process.env.serviceEmail,
        to: receiverEmail,
        subject: subject,
        html: body,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Failed to send email to", receiverEmail)
        } else {
            /* console.log("Email sent: " + info.response) */
        }
    })
}

export default sendEmail
