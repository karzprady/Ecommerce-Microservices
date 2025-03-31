const mongoose = require("mongoose")
const AddressSchema = new mongoose.Schema({
    userId : String,
    address : String,
    city : String,
    pincode : String,
    phone : String,
    notes : String
},{timestamps : true})

const AddressModel = mongoose.model("Address",AddressSchema)
module.exports = AddressModel
