const express = require("express")
const { FilteredProducts, getProductDetails } = require("../../controller/shop/product-controller")

const shopproductroutes = express.Router()


shopproductroutes.get("/getproducts",FilteredProducts)
shopproductroutes.get("/get/:id",getProductDetails)

module.exports = shopproductroutes