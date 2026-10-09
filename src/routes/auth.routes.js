import express from "express";
import { login, register} from "../conroller/auth.controller.js"
import {protect , sellerprotective} from "../midleware/auth.middleware.js"
import {createProduct,getAllProducts,getProductById,} from "../conroller/product.controller.js"

const router = express.Router();

router.post("/register", register);
router.post("/login",login)


export default router;
