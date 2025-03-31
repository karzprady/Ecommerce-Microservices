import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export default function StarComponent({rating,handleClick ,disabled}){

   
    
    return <div className="flex">
       { [1,2,3,4,5].map((star)=>
        ( <Button  disabled={disabled} onClick={()=>handleClick(star)} className="p-3 "><StarIcon key={star} className={star<=rating ? `fill-yellow-300` : ""}/></Button>))

       }
    </div>
}