import usermodel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { Config } from "../config/config.js"

async function sendTokenResponse(user,res,message){
    const Token = jwt.sign({
        id:user.id,
    },
        Config.JWT_TOKEN,{
            expiresIn:"7d"
        }
    )

    res.cookie("token",Token)

    res.status(200).json({
        message,
        success:true,
        user:{
            id:user._id,
            email:user.email,
            contect:user.contect,
            fullname:user.fullname,
            role:user.role
        }
    })
}


export async function register(req,res){
    const {email,contect,password,fullname,isSeller} = req.body

    try{
        const isUserExit = await usermodel.findOne({
            $or:[
                {email},
                {contect}
            ]
        })

        if(isUserExit){
            return res.status(400).json({
                message:"user with the email or contect already exit ",
                success:false
            })
        }

        const user = await usermodel.create({
            email,
            contect,
            password,
            fullname,
            role:isSeller?"seller":"buyer"
        })
        await sendTokenResponse(user,res,"user register successfully")
    }
    catch(error){
          console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}



export async function login (req,res){
    const {email,password}=req.body

    const user = await usermodel.findOne({
        email
    })

    if(!user){
        res.status(404).json({
            message:"Invalid email or password"
        })
    }


   
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        res.status(404).json({
            message:"Invalid Password please try again"
        })
    }
    await sendTokenResponse(user,res,"user login successfully")
}

