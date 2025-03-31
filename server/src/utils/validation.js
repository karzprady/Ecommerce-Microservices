const Joi = require('joi')

const registerValidation = (data)=>{

const schema=Joi.object({
    username : Joi.string().min(5).max(15).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(3).max(7).required()

})
return schema.validate(data)

}

const LoginValidation = async(data)=>{
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
    })
    return schema.validate(data)
}

const ProductValidation = async(data)=>{
    const schema = Joi.object({
    image : Joi.string(),
        title : Joi.string().required(),
        description : Joi.string().required(),
        category : Joi.string().required(),
        brand : Joi.string().required(),
        price : Joi.number().required(),
        salePrice : Joi.number().required(),
        totalStock : Joi.number().required()
    
}
)
return schema.validate(data)
}


module.exports = {registerValidation,LoginValidation,ProductValidation}