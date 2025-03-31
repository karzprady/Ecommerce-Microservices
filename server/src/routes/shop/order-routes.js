const express = require("express")
const { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails, UpdateOrderDetails } = require("../../controller/shop/order-controller")

const orderroutes= express.Router()

orderroutes.post("/create",createOrder)
orderroutes.post("/capture",capturePayment)
orderroutes.get("/userorders/:userId",getAllOrdersByUser)
orderroutes.get("/allorders",getOrderDetails)
orderroutes.post("/updateOrder", UpdateOrderDetails)

module.exports = orderroutes