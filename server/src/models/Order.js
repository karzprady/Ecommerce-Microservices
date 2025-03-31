const mongoose =  require("mongoose")
const OrderSchema = new mongoose.Schema({
    userId : String,
    cartId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price: String,
            salePrice : String,
            quantity : String
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        city : String,
        pincode : String,
        phone : String,
        notes : String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId : String,
    payerId : String
});

const OrderModel  = new mongoose.model("Order",OrderSchema)
module.exports = OrderModel