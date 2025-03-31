import Form from "@/components/ui/common-components/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { OrderStatus } from "@/config";
import { getOrderDetails, UpdateOrderDetails } from "@/store/order-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const initialFormData= {
    "status" : "",
}
export default function AdminOrderDetails({orderItem,setOpenDetailsDialog}) {
    const [formData,setFormData]= useState(initialFormData)
    
    const dispatch= useDispatch()
    const {toast} = useToast()
   
  
   
    function onSubmit(e){
        e.preventDefault()
        dispatch(UpdateOrderDetails({orderId : orderItem._id,status:formData.status})).then(d=>{
            
            
            if(d?.payload?.success){
                dispatch(getOrderDetails())
                toast({
                    title :"updated",
                    variant : "destructive"
                })
                setOpenDetailsDialog(false)
                setFormData(initialFormData)
            }
            
        }
        )

    }
    return (
        <DialogContent className="bg-slate-100">
            <div className="font-extrabold text-fuchsia-500 mt-6">
                <div className="flex  justify-between">
                    <p>Order ID</p>
                    <Label>{orderItem._id}</Label>
                </div >
                <div  className="flex  justify-between">
                    <p>Order Date</p>
                    <Label>{orderItem.orderDate}</Label>
                </div>
                <div  className="flex  justify-between">
                    <p>Order Status</p>
                    <Label>{orderItem.orderStatus}</Label>
                </div>
                <div  className="flex  justify-between">
                    <p>Order Price</p>
                    <Label>{orderItem.totalAmount}</Label>
                </div>
            </div>
            <Separator className="bg-black"/>
            <div>

                <div>
                    <p className="font-extrabold">Order Details</p>
                    {

                     orderItem.cartItems.map((singleCartItem,index)=>(   
                    <div  className="flex  justify-between">
                       
                        <p>Product {index +1 }</p>
                        <Label>{singleCartItem.title} x {singleCartItem.quantity}</Label>
                    </div>))
                    }
                </div>
                    {
                        orderItem.addressInfo ? 
                <div className="mt-4 ">
                    
                    <p className="font-extrabold">Shipping details</p>

                    <div  className="flex  justify-between">
                        <p>Address</p>
                        <Label>{orderItem.addressInfo.address}</Label>
                    </div>
                    <div  className="flex  justify-between">
                        <p>City</p>
                        <Label>{orderItem.addressInfo.city}</Label>
                    </div>
                    <div  className="flex  justify-between">
                        <p>Phone</p>
                        <Label>{orderItem.addressInfo.phone}</Label>
                    </div>
                    <div  className="flex  justify-between">
                        <p>Pincode</p>
                        <Label>{orderItem.addressInfo.pincode}</Label>
                    </div >
                  
                    <div  className="flex  justify-between">
                        <p>Notes</p>
                        <Label>{orderItem.addressInfo.notes}</Label>
                    </div>
                    
                </div> : null}
            
                    <div className="mt-4">
                        <Form registerFormControls={OrderStatus} formData={formData} setFormData={setFormData} ButtonText="Update the Order" onSubmit={onSubmit}/>

                    </div>
                </div>
            
        </DialogContent>
    )
}