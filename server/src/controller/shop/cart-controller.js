const CartModel = require("../../models/Cart")
const ProductModel = require("../../models/Products")
const Logger = require("../../utils/logger")


const addToCart = async(req,res)=>{
    try{
       const {userId , productId , quantity} = req.body
      
       
       if(!userId || !productId || !quantity){
        
        return res.status(400).json({
            success : false,
            message: "invalid data provided"
        })
       }

       const prod = await ProductModel.findById(productId)
      
       if(!prod){
        return res.status(400).json({
            success : false,
            message: "product not found"
        })
       }

       let cart = await CartModel.findOne({userId})
       if(!cart){
        cart = new CartModel({userId,items : []})
       }
       
       
       
       const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()===productId)

       if(findCurrentProductIndex===-1){
        cart.items.push({productId,quantity})
       }
       else{
        cart.items[findCurrentProductIndex].quantity += quantity

       }

       await cart.save()

       res.status(200).json({
        success : true,
        data : cart
       })



    }
    catch(e){
        Logger.error("Error while adding to cart",e)
        res.status(500).json({
            success : false,
            message : e.stack

        })
    }
}

const UpdateCart = async(req,res)=>{
    try{
        const {userId , productId , quantity} = req.body
        
       if(!userId || !productId || quantity<0){
        return res.status(400).json({
            success : false,
            message: "invalid data provided"
        })
       }


       const cart = await CartModel.findOne({userId})
       if(!cart){
       return res.status(400).json({
        success : false,
        message: "cart not found "
    })}

    const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()=== productId)
    
   
    
    if(findCurrentProductIndex===-1){
        return res.status(404).json({
            success : false,
            message: "cart item not found "
        })
    }else if(quantity===0){
        cart.items.splice(findCurrentProductIndex,1)
       }
    else{
    cart.items[findCurrentProductIndex].quantity = quantity 
    }
    
    await cart.save();

    await cart.populate({
        path : 'items.productId',
        select : "image price salePrice title"
    })
     
    const populateCartItems = cart.items.map(item=>({
        productId : item.productId? item.productId._id : null,
        image : item.productId?item.productId.image : null,
        title : item.productId? item.productId.title : "Product not found",
        price : item.productId?item.productId.price : null,
        salePrice : item.productId? item.productId.salePrice : null,
        quantity : item.quantity ? item.quantity : null,
    }))

    res.status(200).json({
        success : true,
        data : {
            ...cart._doc,
            items : populateCartItems
        }
       })


    }
    catch(e){
        Logger.error("Error while updating to cart",e)
        res.status(500).json({
            success : false,
            message : e.stack

        })
    }
}


const DeleteCart = async(req,res)=>{
    try{
        const {userId,productId} = req.params
        if(!userId || !productId ){
            return res.status(400).json({
                success : false,
                message: "invalid data provided"
            })
           }
      const cart = await CartModel.findOne({userId})
      if(!cart){
        return res.status(400).json({
         success : false,
         message: "cart not found "
     })}

     cart.items = cart.items.filter(item=>item.productId._id.toString()!== productId)
     await cart.save()
     await cart.populate({
        path : 'items.productId',
        select : "image price salePrice title"

      })
      const populateCartItems = cart.items.map(item=>({
        productId : item.productId? item.productId._id : null,
        image : item.productId?item.productId.image : null,
        title : item.productId? item.productId.title : "Product not found",
        price : item.productId?item.productId.price : null,
        salePrice : item.productId? item.productId.salePrice : null,
        quantity : item.quantity ? item.quantity : null,
    }))

    res.status(200).json({
        success : true,
        data : {
            ...cart._doc,
            items : populateCartItems
        }
       })




    }
    catch(e){
        Logger.error("Error while deleting to cart")
        res.status(500).json({
            success : false,
            message : e.stack

        })
    }
}

const GetCart = async(req,res)=>{
    try{

        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                success : false,
                message: "user id not  provided"
            })

        }

        const cart = await CartModel.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salePrice"
        })

        if(!cart){
            return res.status(400).json({
                success : false,
                message: "cart  not found "
            })
            
        }

        const validItems = cart.items.filter(productItem=> productItem.productId)
        
        
        if(validItems.length < cart.items.length){
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = validItems.map(item=>({
            
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice : item.productId.salePrice,
            quantity : item.quantity,
            
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
           })

    }
    catch(e){
        Logger.error("Error while fetching to cart",e)
        res.status(500).json({
            success : false,
            message : e.stack

        })
    }
}

module.exports = {
    addToCart,DeleteCart,UpdateCart,GetCart

}