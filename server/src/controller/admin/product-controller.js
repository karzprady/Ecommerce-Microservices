const Logger = require("../../utils/logger")
const {handleImageUpload} = require("../../utils/cloudinaryConfig")
const { ProductValidation } = require("../../utils/validation")
const ProductModel = require("../../models/Products")
const ImageUpload = async(req,res)=>{
    try{

        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await handleImageUpload(url)
        res.json({
         success : true,
         message : "image uploaded succesfully",
         result
        })
        
    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while uploading image"
        })
    }
}

const addProduct = async(req,res)=>{
    try{
        const {error} = await ProductValidation(req.body)
        if(error){
            Logger.error(error.details[0].message)
            res.json({
                success : false,
                message : error.details[0].message
            })
        }
        const {image,description,brand,price,totalStock,salePrice,title,category} = req.body
        const newProduct = new ProductModel({
            image,
            description,
            brand,
            price,
            totalStock,
            salePrice,
            title,
            category
        })
        await newProduct.save()
 
        res.status(201).json({
            success : true,
            message : "product added succesfully",
            newProduct
                })

    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while adding product",
            ProductId : newProduct._id
        })

    }
}

const fetchProduct = async(req,res)=>{
    try{
        


    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while fetching product"
        })
    }
}

const fetchAllProducts = async(req,res)=>{
    try{
        const ListofProduct = await ProductModel.find({})
        
        res.status(200).json({
            success : true,
            ListofProduct
        })

    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while fetching all products"
        })

    }
}

const editProduct = async(req,res)=>{
    try{
        const ProductId = req.params.id 
        if(!ProductId){
            return res.status(500).json({
                success : false,
                message : "id not provided"
            })
        }
        const {error} = await ProductValidation(req.body)
        if(error){
            Logger.error(error.details[0].message)
            return res.json({
                success : false,
                message : error.details[0].message
            })
        }
        const { image,
            description,
            brand,
            price,
            totalStock,
            salePrice,
            title,
            category } = req.body
        let getProduct = await ProductModel.findById(ProductId)
        if(!getProduct){
            Logger.error("product not found")
            res.status(404).json({
                success : false,
                message : "product not found"
            })

        }

        getProduct.title = title || getProduct.title 
        getProduct.description = description || getProduct.description
        getProduct.category = category || getProduct.category
        getProduct.brand = brand || getProduct.brand
        getProduct.totalStock = totalStock || getProduct.totalStock
        getProduct.price = price || getProduct.price
        getProduct.salePrice =  salePrice===0?0 : getProduct.salePrice
        
        await getProduct.save()

        

        res.status(201).json({
            success : true,
            message : "product edited succesfully"
        })


    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while editing product"
        })
    }
}
const deleteProduct = async(req,res)=>{
    try{
        const ProductId = req.params.id 
        if(!ProductId){
            return res.status(500).json({
                success : false,
                message : "id not provided"
            })
        }

        const Product = await ProductModel.findByIdAndDelete(ProductId)
        if(!Product){
            Logger.error("product not found")
            res.status(404).json({
                success : false,
                message : "product not found"
            })


        }
        res.status(200).json({
            success : true,
            message : "product deleted succesfully"
        })


    }
    catch(e){
        Logger.error(e)
        res.json({
            success : false,
            message : "error while deleting product"
        })

    }

}
module.exports = {ImageUpload,addProduct,fetchAllProducts,deleteProduct,editProduct}