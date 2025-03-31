const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    productId: String,
    userId : String,
    userName : String,
    reviewMessage : String,
    reviewNumber : Number
},{timestamps: true})

const ReviewModel =  mongoose.model("Reviews",ReviewSchema)
module.exports = ReviewModel