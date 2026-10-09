import {body,validationResult} from "express-validator"

function validateProduct(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"validation error",
            errors:errors.array()
        })
    }
    next()
}

export const productValidator = [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("priceAmount").notEmpty().withMessage("price amount is required"),
    body("priceCurrency").notEmpty().withMessage("price currency is required"),
    validateProduct
]