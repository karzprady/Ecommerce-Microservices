const express = require("express")
const { getAddress, addAddress, editAddress, delAddress } = require("../../controller/shop/address-controller")

const addressroutes = express.Router()

addressroutes.get("/get/:userId",getAddress)
addressroutes.post("/add",addAddress)
addressroutes.put("/edit/:userId/:addressId",editAddress)
addressroutes.delete("/del/:userId/:addressId",delAddress)

module.exports = addressroutes