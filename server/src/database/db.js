const mongoose = require("mongoose")
function connectToDb (){


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("db connected")
).catch(e=>console.log(e))


}
module.exports = connectToDb