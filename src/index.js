import express from "express"
import cookie from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"

const app=express()
app.use(express.json())
app.use(cookie())
app.use("/auth/api", authRoutes)
export default app