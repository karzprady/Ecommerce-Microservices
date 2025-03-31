const mongoose = require("mongoose")
const RegisterSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    email : {
        type : String,
        required:true,
        unique:true,
        trim:true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user'
    }
})

const RegisterModel = mongoose.model('Register',RegisterSchema)
module.exports = RegisterModel
