const express = require('express')
const SearchQuery = require('../../controller/shop/search-controller')

const searchroutes = express.Router()

searchroutes.get("/results", SearchQuery)

module.exports = searchroutes