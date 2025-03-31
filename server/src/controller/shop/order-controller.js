const paypal = require("../../utils/paypal")
const OrderModel = require("../../models/Order")
const CartModel = require("../../models/Cart")
const ProductModel = require("../../models/Products")
const createOrder = async (req, res) => {
    try {
        const { userId,
            cartId,
            cartItems, addressInfo, orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId } = req.body

        const create_payment_json = {
            intent: 'AUTHORIZE',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shopping/paypal-return',
                cancel_url: 'http://localhost:5173/shopping/paypal-cancel',

            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),

                    },
                    description: 'description'
                }
            ]
        }
        

        paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Error while paypal payment'
                })

            }
            else {
                
                
                const newOrder = new OrderModel({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                    cartId

                })
                await newOrder.save()
                
                const approvalURL = paymentInfo.links.find(link => link.rel ==="approval_url").href

                res.status(201).json({
                    success : true,
                    approvalURL,
                    orderId : newOrder._id
                })
            }
        })
    }

    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })

    }
}

const capturePayment = async (req, res) => {
    try {
        const {paymentId,payerId,orderId} = req.body
         
        const order = await OrderModel.findById(orderId)

        if(!order) {
            return res.status(404).json({
                success : false,
                message : "order not found"
            })
        }

        order.paymentStatus = "paid"
        order.orderStatus= "confirmed"
        order.paymentId = paymentId
        order.payerId =payerId

        for(let item of order.cartItems){
            let product = await ProductModel.findById(item.productId)

            if(!product){
                return res.status(404).json({
                    success : false,
                    message : "item not found"
                })
            }

            product.totalStock -= item.quantity
            await product.save()
        }

        const getCartId = order.cartId
     await CartModel.findByIdAndDelete(getCartId)
        

        await order.save();

        res.status(200).json({
            success : "true",
            message : "order confirmed",
            data : order
        })

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })

    }
}

const getAllOrdersByUser = async (req, res) => {
    try {
      
        const {userId } = req.params 
        const {page =  1 , status = "pending" , price= "lowtohigh" , date = "asc" } = req.query

        
        const limit=5;
        
        if(!userId){
            return res.status(500).json({
                success : false,
                message : "user details not provided"
            })
        }
        
        
        const skip = (page-1) * limit
        
        const sort = {}
        const filters = {}
        filters.userId = userId
        switch(price){
            case 'lowtohigh' :
                sort.totalAmount= 1
                break
            case 'hightolow' :
                sort.totalAmount=-1
                break
            default:
                sort.totalAmount= 1
                break
        }
        
        switch(status){
            case 'pending' :
                filters.orderStatus= 'pending'
                break
            case 'confirmed' :
                filters.orderStatus='confirmed'
                break
            default:
                filters.orderStatus='confirmed'
                break
        }
        switch(date){
            case 'asc' :
                sort.orderDate= 1
                break
            case 'desc' :
                sort.orderDate= -1
                break
            default:
                sort.orderDate= 1
                break
        }

        const data = await OrderModel.find(filters).skip(skip).limit(limit).sort(sort);
        const totalPages =await OrderModel.countDocuments(filters)
        
        
        res.status(201).json({
            success : true,
            data,
            totalPages,
            limit

        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })

    }
}

const getOrderDetails = async (req, res) => {
    try {
        const data = await OrderModel.find()

        res.status(201).json({
            success : true,
            data
        })

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })

    }
}

const UpdateOrderDetails = async(req,res)=>{
    try{

        const {orderId , status} = req.body
        if(!orderId){
            return res.status(404).json({
                success : false,
                message : "orderId not found"
            })
        }

        const OrderItem = await OrderModel.findById(orderId)
        OrderItem.orderStatus=status
        await OrderItem.save()

        res.status(201).json({
            success : true,
            OrderItem
        })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}

module.exports = { createOrder, capturePayment ,getAllOrdersByUser,getOrderDetails,UpdateOrderDetails  }