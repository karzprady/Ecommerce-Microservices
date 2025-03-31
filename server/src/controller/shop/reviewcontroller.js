const OrderModel = require("../../models/Order")
const CartModel = require("../../models/Cart")
const ProductModel = require("../../models/Products")
const ReviewModel = require("../../models/Reviews")
const AddReview = async(req,res)=>{
    try{
        const {productId, userId, userName , reviewMessage, reviewNumber} = req.body
        const order = await OrderModel.findOne({
            userId,
            "cartItems.productId" : productId,
            orderStatus : "confirmed"
        
        })
        if(!order){
            return res.status(403).json({
                success : false,
                message : "you need to buy the product first"
            })
        }
        const newReview = new ReviewModel({
            productId, userId, userName , reviewMessage, reviewNumber

        })
        await newReview.save()
        const reviews = await ReviewModel.find({productId})
        const totalReviews = reviews.length
        const averageReview = reviews.reduce((sum,reviewItem)=>sum+ reviewItem.reviewNumber,0)/totalReviews
        

        const Product= await ProductModel.findByIdAndUpdate(productId,{$set:{averageReview : averageReview.toFixed(2)}},{new : true})
        
        
       
        
        await Product.save()
        console.log(Product,productId);
        res.status(200).json({
            success : true,
            data : newReview
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "something went wrong"
        })
        
    }
}

const getReviews = async (req,res)=>{
    try{

        const {productId}=req.params
        console.log(productId);
        
        if(!productId){
            return res.status(404).json({
                success : false,
                message : "productId not provided"
            })
        }
        const productReviews = await ReviewModel.find({productId})

        res.status(201).json({
            success : true,
             productReviews
        })

    }
    
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "something went wrong"
        })
        
    }

}

module.exports = {AddReview,getReviews}