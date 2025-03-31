const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (data)=>{
    const token=  jwt.sign({userId : data._id,username : data.username,email : data.email,role : data.role},process.env.JWT_SECRET,{expiresIn : "1h"})
    return token
}

module.exports = {generateToken}