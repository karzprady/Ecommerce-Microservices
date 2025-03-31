import { Plus, Minus, Trash } from "lucide-react";

export default function UserCartItemsContent({ item,handleUpdateCart,handleDeleteCart }) {

  
   if(item?.quantity <=0 ) return

    return  <div className="border border-orange-600 rounded-lg bg-amber-200">
        <div className="flex   items-center gap-10">
            <img src={item?.image} alt={item?.title} className="w-20 h-20 object-cover" />
            
                <div className="  flex  items-center justify-between min-w-[700px]:gap-10 w-[396px]:gap-3 ">
                    <div className="font-extrabold text-xl">{item?.title}</div>
                    <div className="flex items-center gap-2 p-1 ml-1 ">
                        <Minus onClick={item?.quantity===1? ()=>handleDeleteCart(item?.productId) : ()=>handleUpdateCart(item?.productId,item?.quantity-1)} className="bg-black text-white rounded-xl" /> { item?.quantity } <Plus  onClick={()=>handleUpdateCart(item?.productId,item?.quantity+1)} className="bg-black text-white rounded-xl" />
 


                    
                </div>
                <div className="space-x-10 mt-1 space-y-2">
                    <div>${item?.salePrice > 0 ? (item?.salePrice)?.toFixed(2) : (item?.price)?.toFixed(2)}</div>
                    <Trash onClick={()=>handleDeleteCart(item?.productId)}/>
                </div>
            </div>
        </div>
    </div>
}