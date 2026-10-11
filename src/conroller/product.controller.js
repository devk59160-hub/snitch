import productmodel from "../models/product.model.js"
import {uploadFile} from "../services/storage.service.js"


export async function createProduct(req,res){
    const {title,description,priceAmount,priceCurrency}=req.body
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file)=>{
        return await uploadFile({
            buffer:file.buffer,
            filename:file.originalname
        })
    }))
    
    const product = await productmodel.create({
        title,
        description,
        price:{
            amount:priceAmount,
            currency: priceCurrency || "INR"
        },

        images,
        seller:seller._id
    })

    res.status(201).json({
        message:"product created successfully",
        success:true,
        product
    })
}

export async function getAllProducts(req,res){
    const products = await productmodel.find()

    res.status(200).json({
        message:"products fetched successfully",
        success:true,
        products
    })
}

export async function getProductById(req,res){
    const {id} = req.params;

    const product = await productmodel.findById(id)

    if(!product){
        return res.status(404).json({
            message:"product not found",
            success:false,
        })
    }

    return res.status(200).json({
        message:"product fetched successfully",
        success:true,
        product
    })
}


export async function addvariant(req,res){
    const productId = req.params.id;

    const product= await productmodel.findOne({
        _id:productId,
        seller:req.user._id
    })

    if(!product){
        return res.status(404).json({
            message:"product not found",
            success:false
        })
    }

    const files = req.files;
    const images=[]

    if(files || files.length !==0){
        (await promise.all(files.map(async (file)=>{
            const image = await uploadFile({
                buffer:file.buffer,
                filename:file.originalname
            })
            return image
        }))).map((image)=>images.push(image))
    }

    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    
    console.log(price)

    product.variants.push({
        images,
        price:{
            amount:Number(price) || product.price.amount,
            currency:req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message:"product variant add successfully",
        success:true,
        product
    })


}