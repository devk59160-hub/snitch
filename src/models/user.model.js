import bcrypt from "bcrypt"
import mongoose from "mongoose"



const usershema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    contect:{
        type:String,
        required:false,

    },
    password:{
        type:String,
        required:function (){
            return !this.googleId
        }

    },
    fullname:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    },
    googleId:{
        type:String
    }
})


usershema.pre("save",async function () {
    if(!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password,10);
    this.password=hash
})

usershema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

const userdata = mongoose.model("userdata",usershema)
export default userdata