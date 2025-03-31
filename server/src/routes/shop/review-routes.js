const express = require("express")
const { AddReview, getReviews } = require("../../controller/shop/reviewcontroller")

const reviewroutes = express.Router()

reviewroutes.post("/add",AddReview)
reviewroutes.get("/get/:productId",getReviews)

module.exports = reviewroutes