const express = require("express")
const { register, Login, Logout } = require("../../controller/user/user-controller")
const AuthMiddleware = require("../../middleware/auth-middleware")
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",Login)
userRouter.post("/logout",Logout)
userRouter.get("/checkauth",AuthMiddleware,(req,res)=>{
    const user = req.user
    res.status(201).json({
        success : true,
        message : "User is Authenticated",
        user
    })
})

module.exports = userRouter