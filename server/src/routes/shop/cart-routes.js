const express = require("express")
const { addToCart, GetCart, DeleteCart, UpdateCart } = require("../../controller/shop/cart-controller")

const cartroutes = express.Router()

cartroutes.post("/add",addToCart)
cartroutes.get("/get/:userId",GetCart)
cartroutes.delete("/delete/:userId/:productId",DeleteCart)
cartroutes.put("/update-cart",UpdateCart)

module.exports = cartroutes