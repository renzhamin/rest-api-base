import express from "express"
import cors from "cors"
import router from "./routes"
import cookieParser from "cookie-parser"

const app = express()

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server running at port", port))
