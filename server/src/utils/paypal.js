const paypal = require("paypal-rest-sdk")
const axios = require("axios")
paypal.configure({
    mode : 'sandbox',
    client_id : "AYlHP5y2CDOR_yYpGp6vmr2BeULt2NT4V_WX1Stkp2loKjramcgNctLBPOnUbUYQu388V9ZgQBX-Fkly",
    client_secret: "ENNJTUn9wsfwFiiY9Q_HYw0vgS6-7e-biI5SDcETd0Mj-3TCfoZxDDGmCXS7EUgiWQU049JlNwkXhgDx"
})





module.exports= paypal
