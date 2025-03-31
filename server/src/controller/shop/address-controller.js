const Logger = require("../../utils/logger")
const AddressModel= require("../../models/Address")
const addAddress = async(req,res)=>{
    try{
        const {userId, address, city, pincode, phone, notes} = req.body

        if(!userId || !address || !city || !pincode || !phone ||!notes){
            return res.status(400).json({
                success : false,
                message : "Invalid data provided!"
            })
        }

        const newlyCreatedAddress = new AddressModel({
            userId,address,city,pincode,phone,notes
        }) 
        
        await newlyCreatedAddress.save()

        res.status(201).json({
            success: true,
            message : "added address"
        })

    }
    catch(e){
        Logger.error("error while adding address",e)
        res.status(500),json({
            success : false,
            message : e.stack
        })
    }
}
const getAddress = async(req,res)=>{
    try{
        const {userId}=req.params
        if(!userId){
            return res.status(400).json({
                success:false,
                message: "userId required"
            })
        }

        const address = await AddressModel.find({userId})
        res.status(200).json({
            success:true,
            data : address
        })


    }
    catch(e){
        Logger.error("error while fetching address",e)
        res.status(500),json({
            success : false,
            message : e.stack
        })
    }
}
const editAddress = async(req,res)=>{
    try{
        const {userId,addressId} = req.params
        const formData = req.body
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message: "invalid details provided"
            })
        }

        const currentaddresss = await AddressModel.findOneAndUpdate({
            _id : addressId , userId
        },formData,{new : true})

        if(!currentaddresss){
            return res.status(404).json({
                success  : false,
                message : "Address not found"
            })
        }

        res.status(200).json({
            success : true,
            data : currentaddresss
        })
           
    }
    catch(e){
        Logger.error("error while editing address",e)
        res.status(500),json({
            success : false,
            message : e.stack
        })
    }
}

const delAddress = async(req,res)=>{
    try{
        const {userId,addressId} = req.params
        
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message: "invalid details provided"
            })
        }
        console.log(addressId,userId);
        
        const currentaddresss = await AddressModel.findOneAndDelete({_id : addressId ,userId})

        if(!currentaddresss){
            return res.status(404).json({
                success  : false,
                message : "Address not found"
            })
        }

        res.status(200).json({
            success : true,
            message  : "address deleted succesfully"
        })

    }
    catch(e){
        Logger.error("error while deleting address",e)
        res.status(500),json({
            success : false,
            message : e.stack
        })
    }
}

module.exports={addAddress,getAddress,delAddress,editAddress}