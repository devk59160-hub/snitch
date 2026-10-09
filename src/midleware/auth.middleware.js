import jwt from "jsonwebtoken"
import { Config} from "../config/config.js"
import usermodel from "../models/user.model.js"


export async function protect(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"not authorized to access this route",
            success:false
        })
    }

    try{
        const decoded = jwt.verify(token,Config.JWT_TOKEN)
        const user = await usermodel.findById(decoded.id)

        if(!user){
            return res.status(401).json({
                message:"unauthorized",
                success:false
            })
        }

        req.user = user
        next()

    }
    catch(error){
        console.log(error)
       return res.status(401).json({ message: "Unauthorized Error" })
    }
}


export async function sellerprotective(){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"not authorized to access this route"
        })
    }

    try{
        const decoded = jwt.verify(token,Config.JWT_TOKEN)
        const user = await usermodel.findById(decoded.id)

        if(!user){
            return res.status(401).json({
               message:"unauthorized"
            })
        }

        if(user.role !== "seller"){
            return res.status(401).json({
                message:"unauthorized"
            })
        }
        req.user = user
        next()
    }
    catch(error){
        console.log(error)
        return res.status(401).json({message:"unauthorized"})
    }
}