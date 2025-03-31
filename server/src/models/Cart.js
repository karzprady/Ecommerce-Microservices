const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Register"
    },
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Products'
            },
            quantity : {
                type : Number,
                required : true,
            }
        }
    ]
},{timestamps : true})

const CartModel = mongoose.model("Cart",CartSchema)

module.exports = CartModel