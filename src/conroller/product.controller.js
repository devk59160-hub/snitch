import productmodel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js"

export async function createProduct(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency } = req.body;
        const seller = req.user;

        const files = req.files || [];
        const images = await Promise.all(files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                filename: file.originalname
            });
        }));

        const product = await productmodel.create({
            title,
            description,
            price: {
                amount: Number(priceAmount) || 0,
                currency: priceCurrency || "INR"
            },
            images,
            image: images,
            seller: seller?._id,
            sellerId: seller?._id
        });

        console.log("Created product:", product);

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            message: error.message || "Failed to create product",
            success: false
        });
    }
}

export async function getAllProducts(req, res) {
    try {
        const filter = {};
        // If route is /seller and user is authenticated
        if (req.baseUrl.includes("/seller") || req.path.includes("/seller")) {
            if (req.user?._id) {
                filter.$or = [{ seller: req.user._id }, { sellerId: req.user._id }];
            }
        }

        const products = await productmodel.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await productmodel.findById(id).populate("seller", "fullname email contect");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export async function addvariant(req, res) {
    try {
        const productId = req.params.productId || req.params.id;

        const product = await productmodel.findOne({
            _id: productId,
            $or: [{ seller: req.user._id }, { sellerId: req.user._id }]
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or unauthorized",
                success: false
            });
        }

        const files = req.files || [];
        const images = await Promise.all(files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                filename: file.originalname
            });
        }));

        const price = req.body.priceAmount;
        const stock = Number(req.body.stock) || 0;
        let attributes = {};
        try {
            attributes = JSON.parse(req.body.attributes || "{}");
        } catch {
            attributes = {};
        }

        const variantObj = {
            images,
            image: images,
            price: {
                amount: Number(price) || (typeof product.price === "number" ? product.price : product.price?.amount || 0),
                currency: req.body.priceCurrency || (product.price?.currency || "INR")
            },
            stock,
            attributes
        };

        product.variants.push(variantObj);
        await product.save();

        return res.status(200).json({
            message: "Product variant added successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("Error adding product variant:", error);
        return res.status(500).json({
            message: error.message || "Failed to add product variant",
            success: false
        });
    }
}