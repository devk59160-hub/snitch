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
            contact:user.contact,
            fullname:user.fullname,
            role:user.role
        }
    })
}


export async function register(req,res){
    const {email,contact,password,fullname,isSeller} = req.body
    // const userContact = contact || contect //

    try{
        const isUserExit = await usermodel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(isUserExit){
            return res.status(400).json({
                message:"User with this email or contact already exists",
                success:false
            })
        }

        const user = await usermodel.create({
            email,
            contact,
            password,
            fullname,
            role:isSeller ? "seller" : "buyer"
        })
        await sendTokenResponse(user,res,"User registered successfully")
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
        return res.status(404).json({
            message:"Invalid email or password",
            success:false
        })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid Password please try again",
            success:false
        })
    }
    await sendTokenResponse(user,res,"User login successfully")
}

export async function getme(req, res) {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            email: req.user.email,
            contect: req.user.contect,
            fullname: req.user.fullname,
            role: req.user.role
        }
    });
}
