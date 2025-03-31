const express =require("express")
const connectToDb = require("./database/db")
const cors=require("cors")
const cookie = require("cookie-parser")
const userRouter = require("./routes/user/UserRoutes")
const Logger = require("./utils/logger")
const productroutes = require("./routes/admin/productroutes")
const shopproductroutes = require("./routes/shop/product-routes")
const cartroutes = require("./routes/shop/cart-routes")
const addressroutes = require("./routes/shop/address-routes")
const orderroutes = require("./routes/shop/order-routes")
const CSPMiddleware = require("./middleware/CSP")
const helmet = require('helmet');
const searchroutes = require("./routes/shop/search-routes")
const reviewroutes = require("./routes/shop/review-routes")
const app = express()
require("dotenv").config()
connectToDb()
app.use(express.json())
// Use helmet to set security headers
app.use(helmet());

// Set a custom CSP (this disallows `unsafe-eval`)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://*.paypal.com", "https://www.gstatic.com"],
      objectSrc: ["'none'"], // Disallow objects, embed, etc.
      upgradeInsecureRequests: [] // This could be useful if using HTTPS
    },
  })
);

  
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE"],
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
        "Content-Security-Policy"
    ],
    credentials : true
}))

app.use(cookie())
app.use((req,res,next)=>{
    Logger.info(`method : ${req.method} with URL ${req.url}`)
    next()
})
app.use("/api/user",userRouter)

app.use("/api/admin/products",productroutes)

app.use("/api/shop/products",shopproductroutes)

app.use("/api/shop/cart", cartroutes)

app.use("/api/shop/address",addressroutes)

app.use("/api/shop/order", CSPMiddleware, orderroutes)

app.use("/api/shop/search", searchroutes)

app.use("/api/shop/reviews",reviewroutes)

app.listen(process.env.PORT,()=>{
    console.log("server started");
    
})