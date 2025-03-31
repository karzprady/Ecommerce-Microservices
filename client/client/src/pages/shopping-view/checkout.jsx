import UserCartItemsContent from "@/components/ui/shopping/cart-items-content";
import Address from "./address";
import { useDispatch, useSelector } from "react-redux";
import one from "../../assets/two.jpg"
import { DeleteCart, UpdateCart } from "@/store/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/order-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
export default function Checkout() {
    const [selectAdd, setselectAdd] = useState("")
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { cartItems } = useSelector(state => state.cartSlice)
    const [paymentstart,setpaymentstart]  = useState(false)
    const {approvalURL} = useSelector(state=>state.orderSlice)
   

    
    

    let FinalPrice = cartItems && cartItems?.items?.length > 0 ? cartItems?.items?.reduce((sum, curItem) =>
        sum + (curItem?.salePrice > 0 ? curItem?.salePrice : curItem?.price) * curItem?.quantity

        , 0) : 0


    function handleDeleteCart(id) {
        dispatch(DeleteCart({
            userId: user?.userId,
            productId: id
        })).then(d => {
            
            if (d?.payload?.success) {

                toast({
                    title: "deleted the product from cart"
                })
            }

        })

    }
    function handleUpdateCart(id, quantity) {



        dispatch(UpdateCart({
            userId: user?.userId,
            productId: id ? id : null,
            quantity
        })).then(d => {
            

            if (d?.payload?.success) {
                toast({
                    title: "updated"
                })


            }
        })

    }
    

    function handleInitiatePaypalPayment() {
        if(!selectAdd) return alert("select address")
            setpaymentstart(true)
        const orderData = {
            userId : user?.userId,
            cartId : cartItems._id,
            cartItems : cartItems?.items.map(item=>({
                productId : item?.productId,
                title : item?.title,
                image : item?.image,
                price : item?.salePrice > 0 ? item?.salePrice : item?.price,
                quantity : item?.quantity

 
            })),
            addressInfo : {
                addressId : selectAdd._id,
                address : selectAdd.address,
                city : selectAdd.city,
                pincode : selectAdd.pincode,
                phone : selectAdd.phone,
                notes: selectAdd.notes
            }

            ,
            orderStatus  : 'pending',
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : FinalPrice,
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : '',
            payerId : ''
        }

        
        dispatch(createNewOrder(orderData)).then(d=>{
            setpaymentstart(false)
            
        }).catch(e=>{(e);console.log
            setpaymentstart(false)
        }
        )
        
    }
    
    if(approvalURL) {
        window.location.href = approvalURL
    }
    
    return (
        <div className="flex flex-col">
            <div className="relative h-[600px] w-full overflow-hidden">
                <img src={one} className="object-cover w-full h-full object-center" />
            </div>
            <div className="grid grid-cols-[1fr,400px] gap-3 mt-5 p-5">
                
                <Address setselectAdd={setselectAdd}/>
                <div className="flex flex-col gap-3">
                    {
                        cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map(item =>
                            <UserCartItemsContent item={item} handleUpdateCart={handleUpdateCart} handleDeleteCart={handleDeleteCart} />
                        ) : null
                    }
                    <div className="flex justify-between">
                        <span className="font-bold"> Total </span>
                        <span className="font-bold"> {FinalPrice} </span>
                    </div>
                    <Button onClick={handleInitiatePaypalPayment} className="bg-orange-600" disabled = {cartItems.items.length>0? false : true}> {paymentstart ? <Loader className="w-30 h-30"/> : "Checkout with paypal"}  </Button>
                </div>
            </div>
           


        </div>
    )
}   