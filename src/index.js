import express from "express"
import cookie from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import productRouter from "./routes/product.route.js"


const app=express()
app.use(express.json())
app.use(cookie())
app.use("/auth/api", authRoutes)
app.use("/auth/product", productRouter)
export default app
