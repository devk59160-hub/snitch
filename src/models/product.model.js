import mongoose from "mongoose"
import priceSchema from "./price.model.js"

const productschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdata",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:[
        {
            url:{
                type:String,
                required:true
            }
        }
    ],
    variant:[
        {
            image:[
                {
                    url:{
                        type:String,
                        required:true
                    }
                }
            ],
            stock:{
                type:Number,
                default:0
            },
            attribute:{
                type:Map,
                of:String
            },
            price:{
                type:priceSchema
            }
        }
    ]

},{
    timestamps:true
})

const productdata=mongoose.model("productdata",productschema)
export default productdata

