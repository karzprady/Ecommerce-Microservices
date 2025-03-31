const express = require("express")
const { ImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct } = require("../../controller/admin/product-controller")
const { upload } = require("../../utils/cloudinaryConfig")

const productroutes = express.Router()

productroutes.post("/upload-image", upload.single('file') ,ImageUpload)
productroutes.post("/addproduct",addProduct)
productroutes.put("/editproduct/:id",editProduct)
productroutes.get("/getproducts",fetchAllProducts)
productroutes.delete("/deleteproduct/:id",deleteProduct)

module.exports = productroutes