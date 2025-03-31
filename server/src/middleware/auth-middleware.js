const Logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const AuthMiddleware = async(req,res,next)=>{
    try{
        const token = req.cookies.token
       
        
        if(!token){
            return res.status(404).json({
                success : false,
                message : "token not provided"
            })
        }
        const decodetoken = await jwt.verify(token,process.env.JWT_SECRET)
        req.user= decodetoken
        next()


    }
    catch(e){
        Logger.error(e)
        return res.status(401).json({
            success : false,
            message : "unauthorised User"
        })
    }
}

module.exports = AuthMiddleware