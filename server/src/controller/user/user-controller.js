const { http } = require("winston")
const RegisterModel = require("../../models/Register")
const { generateToken } = require("../../utils/generateToken")
const Logger = require("../../utils/logger")
const { registerValidation, LoginValidation } = require("../../utils/validation")
const bcrypt = require("bcryptjs")


const register = async (req,res)=>{
    try{
       Logger.info("registering user...")
       const {error}= registerValidation(req.body)
       if(error){
        Logger.error("validation error",error.details[0].message)
        return res.status(500).json({
            success : false,
            message : error.details[0].message
        })
       }
       const {username,email,password}=req.body

       const checkUser = await RegisterModel.findOne({email})
       
       
       if(checkUser){
        Logger.warn("user already exists")
        return res.status(409).json({
            success : false,
            message : "user already exists with same details"
        })
       }

       
       const hashSalt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,10)

       
       const NewRegister = new RegisterModel({
        username,
        email,
        password : hashedPassword
       })


       await NewRegister.save()
       


       Logger.info("user registered successfully")
       return res.status(200).json({
        success : true,
        message : "user registered successfully",
       })

        
    }
    catch(e){
        Logger.error("error in registering user",e)
        return res.status(500).json({
            success : false,
            message : "error in registering user"
        })

    }
}

const Login = async(req,res)=>{
    try{
        const {error} = LoginValidation(req.body)
        if(error){
            Logger.error("error in details provied",error.details[0].message)
            return res.status(500).json({
                success : false,
                message : error.details[0].message
            })
        }

        const {email,password} = req.body
        const checkUser = await RegisterModel.findOne({email})
        if(!checkUser){
            Logger.warn("user doesnt exists")
            return res.status(409).json({
                success : false,
                message : "user doesnt exists"
            })
        }
       
        
        const decodePassword = await bcrypt.compare(password,checkUser.password)
        if(!decodePassword){
            Logger.warn("wrong password entered")
            return res.status(403).json({
                success : false,
                message : "wrong password entered"
            })
        }
        const token = await generateToken(checkUser)
        res.cookie('token',token,{
            httpOnly : true,
            sameSite : "None",
            secure : true,
            maxAge : 60*60*1000
        })

        res.status(201).json({
            success : true,
            message : "user logged in successfully",
            user : {
                role : checkUser.role,
                userId : checkUser._id,
                email : checkUser.email,
                username : checkUser.username
            }

        })

    }
    catch(e){
        Logger.error("error in login",e)
        return res.status(500).json({
            success : false,
            message : "error in login user"
        })
    }
}

const Logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly : true,
            sameSite : "None",
            secure : true,
        })
        
        res.json({
            success : "true",
            message : "logged out successfully"
        })
    }
    catch(e){
        Logger.error(e)
    }
}

module.exports = {register,Login,Logout}