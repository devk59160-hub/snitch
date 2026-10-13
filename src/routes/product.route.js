import express from "express"
import {protect , sellerprotective} from "../midleware/auth.middleware.js"
import {createProduct,getAllProducts,getProductById,addvariant} from "../conroller/product.controller.js"
import multer from "multer"
import {productValidator} from "../validator/product.validator.js"



const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

const router = express.Router();

router.post("/create", sellerprotective, upload.array("images",8),productValidator,createProduct,)

router.get("/seller",protect,getAllProducts)

router.get("/",getAllProducts)

router.get("/detail/:id",getProductById)

router.post("/:productId/variants",sellerprotective,upload.array("images",7),addvariant)



export default router