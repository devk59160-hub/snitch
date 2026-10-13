import express from "express"
import cookie from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import productRouter from "./routes/product.route.js"


const app=express()
// app.use(cors({
//     origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
//     credentials: true
// }))
app.use(express.json())
app.use(cookie())
app.use("/auth/api", authRoutes)
app.use("/auth/product", productRouter)
export default app
