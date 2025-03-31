import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { setProductDetails } from "@/store/shop-product";
import { DialogClose } from "@radix-ui/react-dialog";

import { Star, StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import StarComponent from "./starComponent";
import { useEffect, useState } from "react";
import Address from "./address";
import { addReviews, getReviews, resetReviews } from "@/store/reviews-slice";



export default function ProductDetailsDialog({ open, setOpen, product, handleAddtoCart }) {

   const dispatch = useDispatch()
   const [starvalue,setstarvalue] = useState(0)
   const [message,setmessage] = useState("")
   const {user} = useSelector(state=>state.auth)
   const {reviews} = useSelector(state=>state.reviewSlice)
   function handleDialogClose() {
      setOpen(false)
      dispatch(setProductDetails())
   }
  
  useEffect(()=>{
   if(open){
      dispatch(getReviews(product._id))
   }
   else{
      dispatch(resetReviews())
   }
  },[open])
   
   
  function handleAddReview(){
   const data = {
      reviewMessage :message,
      reviewNumber : starvalue,
      productId : product._id,
      userId : user.userId,
      userName : user.username
   }
   
   
   dispatch(addReviews(data)).then(d=>{
      if(d?.payload?.success){
         dispatch(getReviews(product._id))
         setstarvalue(0)
         setmessage("")
        
      }
   }
   )

   




  }

  function handleClick(star){
   setstarvalue(star)
  }


   return <Dialog open={open} onOpenChange={handleDialogClose} className="relative ">
      <DialogContent className="   bg-slate-600">
         <DialogClose className="absolute top-2 right-2">
            <button className="font-semibold justify-center border rounded-lg shadow-lg border-fuchsia-900 bg-green-200  w-8 h-7"></button>
         </DialogClose>
         <div className="grid grid-cols-[240px,260px] gap-4 ">
            <div>
               <img src={product?.image} alt={product?.title} className="w-[25rem] h-[300px]" />



            </div>

            <div className="flex flex-col items-center gap-3">
               <h1 className="text-2xl font-extrabold border-b border-red-700">{product?.title}</h1>
               <p>{product?.description}</p>
               <Separator />
               <div className="flex items-center gap-4 font-semibold text-2xl">
                  <p className={`${product?.salePrice > 0 ? 'line-through' : ""}`}>${product?.price}</p>
                  {product?.salePrice > 0 ? <p> ${product?.salePrice}</p> : null}
               </div>
               <Button onClick={() => handleAddtoCart(product._id)} className="font-semibold justify-center border rounded-lg shadow-lg border-fuchsia-900 bg-green-200 w-full h-10">Add to Cart</Button>
               <div className="shadow-sm  ">
                  <p className="font-extrabold text-xl">Reviews</p>  <div className="h-[300px] overflow-y-scroll">

                  {
                   
                     reviews?.length > 0 ? reviews.map(item=>
                  <div className="grid gap-6  border border-violet-400 shadow-sm rounded-sm mt-2 ">
                     <div className="flex gap-4">
                        <Avatar className="w-10 h-10 border bg-fuchsia-200 ">
                           <AvatarFallback>{item?.userName?.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                           <div className="flex items-center gap-2">
                              <h3 className="font-bold">{item.userName}</h3>
                           </div>
                           <div className="flex items-center gap-0.5">

                           <StarComponent rating={item.reviewNumber} handleClick={handleClick} disabled = {true}/>
                              {/* <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" /> */}
                           </div>
                           <p>{item.reviewMessage}</p>
                        </div> 
                     </div>
                   
                  </div>) : null
} </div>
                  <Separator className="bg-red-400 mt-4"/>
                  <div className="mt-8 flex flex-col gap-3">
                     <span className="font-extrabold text-red-400"> Give your review now</span>
                  <StarComponent rating={starvalue} handleClick={handleClick}/>
                     <Input placeholder="Comment your Opinion" onChange={(e)=>setmessage(e.target.value)
                     } value={message}/>
                     
                     <Button onClick={handleAddReview} className="bg-fuchsia-300" >Submit</Button>
                  </div>
               </div>

            </div>

         </div>


      </DialogContent>

   </Dialog>
}