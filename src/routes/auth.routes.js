import express from "express";
import { login, register} from "../conroller/auth.controller.js"
import {validationRegister,validationLoginUser} from "../validator/auth.validator.js"
const router = express.Router();

router.post("/register", validationRegister,register);
router.post("/login",validationLoginUser,login)


export default router;
