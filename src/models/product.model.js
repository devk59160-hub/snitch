import mongoose from "mongoose"
import priceSchema from "./price.model.js"

const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
    },
    price: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    images: [
        {
            url: String,
            fileId: String,
        }
    ],
    image: [
        {
            url: String,
            fileId: String,
        }
    ],
    variants: [
        {
            images: [
                {
                    url: String,
                    fileId: String,
                }
            ],
            image: [
                {
                    url: String,
                    fileId: String,
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                type: mongoose.Schema.Types.Mixed
            }
        }
    ],
    variant: [
        {
            images: [
                {
                    url: String,
                    fileId: String,
                }
            ],
            image: [
                {
                    url: String,
                    fileId: String,
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attribute: {
                type: Map,
                of: String
            },
            price: {
                type: mongoose.Schema.Types.Mixed
            }
        }
    ]
}, {
    timestamps: true
})

const productdata = mongoose.model("productdata", productschema)
export default productdata
