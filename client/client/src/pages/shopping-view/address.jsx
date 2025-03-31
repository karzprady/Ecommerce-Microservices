import { Button } from "@/components/ui/button";
import Form from "@/components/ui/common-components/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { AddressFormControls } from "@/config";
import { addAddress, delAddress, editAddress, getAddress } from "@/store/shop-product/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Address({setselectAdd}){
    const {user} = useSelector(state=>state.auth)
    const {addList} = useSelector(state => state.addSlice)
    const [show,setShow] = useState(false)
    const dispatch = useDispatch()
    const [open,setopen] = useState(false)
    const {toast} = useToast()
    const [curaddid,setcuraddid] = useState(null)
    const loc=useLocation()
    
    
   
    
 
    const initialForm = {
        userId : user?.userId,
        address : "",
        phone : "",
        pincode : "",
        notes : "",
        city: ""
    }
    const [formData,setFormData] = useState(initialForm)
    useEffect(()=>{
        dispatch(getAddress({userId : user?.userId}))
    },[dispatch])

   

   
   
    
    function handleDeleteAddress(currentAddressId){
        dispatch(delAddress({userId : user?.userId , addressId : currentAddressId})).then((d)=>{
            if(d?.payload?.success){
                dispatch(getAddress({userId : user?.userId}))
                toast({
                    title : "address deleted succesfully",
                    variant : "destructive"
                })
                


            }
        })


    }
    function onSubmit(e){
        e.preventDefault()
        if(curaddid){
            dispatch(editAddress({
                userId : user?.userId , addressId : curaddid, formData
            })).then(d=>{
               
                
                if(d?.payload?.success){
                    dispatch(getAddress({userId : user?.userId}))
                    toast({
                        title : "address edited succesfully",
                        variant : "destructive"
                    })
                  
                    
    
    
                }
            })

        }
        else{
        dispatch(addAddress( {
            formData
        })).then(d=>{
            if(d?.payload?.success){
                dispatch(getAddress({userId : user?.userId}))
                toast({
                    title : "address added succesfully",
                    variant : "destructive"
                })
                
                setFormData(initialForm)
                
            }}
            
        )
    }

    }

    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key]!=="" && formData[key]!==0).every(key=>key)
    }
    return (<div >
         
        <div className="mb-5"><Button onClick={()=>setShow(!show)} className="bg-fuchsia-400  font-extrabold">{addList?.length>0 ? "Add Alternate Addresses": "Add Address"}</Button></div>
       {show? <Form registerFormControls={AddressFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit} isFormValid={!isFormValid()}/>:null}
     <div className="mt-3 grid grid-cols-3 gap-4">
    
    {
        addList?.length > 0 ? addList.map((add,index)=>(
        <div key ={index} className="relative mt-5 bg-lime-300  border rounded-lg shadow-2xl"><span className="text-red-500 font-extrabold">Address {index+1}</span>
        <Button onClick ={()=>{setopen(true);
            setFormData({
                address : add.address,
                city : add.city,
                notes : add.notes,
                phone : add.phone,
                pincode : add.pincode,
                userId : add.userId,
            });
            setcuraddid(add._id)
            
        }} className="absolute bottom-0 left-2 bg-red-800 text-lime-500">Edit</Button>
        <Button onClick ={()=>handleDeleteAddress(add._id)} className="absolute bottom-0 left-20 bg-red-800 text-lime-500">Delete</Button>
        {loc.pathname ==="/shopping/checkout" ? <Button onClick={()=>setselectAdd(addList[index])} className="h-5 absolute top-7  right-3 bg-red-800 text-lime-500" >Select</Button> : null}
        <Form registerFormControls={AddressFormControls} formData={add} setFormData={setFormData} show={false}  isFormValid={!isFormValid()} ButtonText={"Edit"}/></div>)) : null
    }
    
    
     </div>
     <Sheet open={open} onOpenChange={()=>{setopen(false)
        setFormData(initialForm)
    setcuraddid(null)
}
     }>
        <SheetContent side="right" className="bg-amber-300">
        <SheetHeader>
        <SheetTitle>
            Edit Address
        </SheetTitle>
        </SheetHeader>
        <Form registerFormControls={AddressFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit}  isFormValid={!isFormValid()} ButtonText={"Save"}/>
        </SheetContent>

     </Sheet>
     </div>)
}