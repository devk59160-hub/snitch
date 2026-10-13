import express from "express";
import { login, register, getme } from "../conroller/auth.controller.js";
import { validationRegister, validationLoginUser } from "../validator/auth.validator.js";
import { protect } from "../midleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validationRegister, register);
router.post("/login", validationLoginUser, login);
router.get("/getme", protect, getme);

export default router;
