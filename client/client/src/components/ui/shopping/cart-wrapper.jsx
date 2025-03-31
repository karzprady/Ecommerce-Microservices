import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { SheetContent, SheetHeader, SheetTitle } from "../sheet";
import UserCartItemsContent from "./cart-items-content";
import { DeleteCart, getCart, UpdateCart } from "@/store/cart-slice";
import { useState } from "react";
import { toast, useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";

export default function UserCartWrapper({cartItems,setopencart}){
     const nav = useNavigate()
    let FinalPrice = cartItems && cartItems.length > 0 ?  cartItems.reduce((sum,curItem)=>
        sum + ( curItem.salePrice>0 ? curItem?.salePrice : curItem?.price) * curItem?.quantity

    ,0) : 0
    const dispatch = useDispatch()
    const {user}= useSelector(state=>state.auth)
    const {toast} = useToast()

    
    const {Product} = useSelector(state=>state.shopSlice)
    




    
    function handleDeleteCart(id){
        dispatch(DeleteCart({
            userId : user?.userId,
            productId : id
        })).then(d=>{
          
            if(d?.payload?.success){
                
                toast({
                    title : "deleted the product from cart"
                })
            }
            
        })

    }
     function handleUpdateCart(id,quantity){
     
        
        let totalStock = Product.filter(item=>item._id === id)[0].totalStock
        
        if(quantity > totalStock){
            toast({
                title : "max limit reached"
            })
        }
        
        // if(quantity + 1 > totalStock){
        //     alert("Max limit reached")
        //     toast({
        //         title : "Max limit reached"
        //     })
        // }
        else{
        
            
            dispatch(UpdateCart({
                userId : user?.userId,
                productId : id ? id : null,
                quantity 
            })).then(d=>{
                
                
                if(d?.payload?.success){
                    toast({
                        title : "updated"
                    })
                   
    
                }
        })
    }
        }
   
    return <SheetContent className=" bg-white sm:max-w-md">
        <SheetHeader>
            <SheetTitle>
                Your Cart
            </SheetTitle>
        </SheetHeader>
        <div className="mt-9 space-y-4">
            {
                cartItems?.length>0 ? cartItems.map(item => <UserCartItemsContent item={item} handleUpdateCart={handleUpdateCart} handleDeleteCart ={handleDeleteCart} /> ) : null
            }

        </div>
        <div className="mt-9 space-y-4">
        <div className="flex justify-between">
            <span className="font-bold"> Total </span>
            <span className="font-bold"> {FinalPrice} </span>
        </div>
        </div>
        <Button onClick={()=>{nav("/shopping/checkout"); setopencart(false)}} className="bg-black text-white w-full mt-6">Checkout</Button>

    </SheetContent>
}