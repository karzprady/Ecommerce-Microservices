import { useState } from "react";
import { LoginFormControls, RegisterFormControls } from "../../config";
import Form from "../../components/ui/common-components/form";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Description } from "@radix-ui/react-toast";

export default function AuthLogin(){
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {toast} = useToast()
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(loginUser(formData)).then((data)=>{
           
            if(data?.payload?.success === true) {
                toast({
                    title : data?.payload?.message
                    
                })
                
                // if(data?.payload?.role==="admin")  nav("/admin/dashboard")
                // nav("/shopping/home")
            }
            else{
                toast({
                    title : data?.payload?.message,
                    variant : "destructive"
                    
                })

            }
        })
       
    }
    return (
        <div className="text-start">   Welcome to Login
        
            <Form registerFormControls={LoginFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
        </div>
    )
}