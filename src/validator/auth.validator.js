import { body,validationResult} from "express-validator"

function validationRequest(req,res,next){
const errors = validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
next();
}


export const validationRegister=[
    body("email")
    .isEmail().withMessage("invalide email formate"),
    body("contact")
    .isEmpty().withMessage("contact is required")
     .matches(/^\d{10}$/)
    .withMessage("contact must be a 10 digit number"),
    body("password")
    .isEmpty().withMessage("Password must be at least 6 characters long"),
        body("fullname")
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),
    body("isSeller")
        .isBoolean().withMessage("isSeller must be a boolean value"),
        validationRequest
]


export const validationLoginUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validationRequest
]