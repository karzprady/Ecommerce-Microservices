import { useState } from "react";
import { RegisterFormControls } from "../../config";
import Form from "../../components/ui/common-components/form";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";


export default function AuthRegister(){
    // const [message,setMessage]=useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()
    
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    })
    const onSubmit=async(e)=>{
        e.preventDefault()
        dispatch(registerUser(formData)).then((data)=>{
            console.log(data);
            if(data?.payload.success===true) {
            toast({
                title : data?.payload?.message,
                
            })
            navigate("/auth/login")}
            else{
                toast({
                    title : data?.payload?.message,
                    variant : "destructive"
                })
            }
            
            
        })
        
        // fetch("http://localhost:3000/api/user/register", {
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     },
        //     body : JSON.stringify(formData)
        // }).then(res=>res.json()).then(data=>setMessage(data.message)).catch(err=> setMessage(err.message))
        
    }
    return (
        <div>
            Welcome to Registeration
            {/* {message && <p className="text-red-500">{message}</p>} */}
        
            <Form registerFormControls={RegisterFormControls} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
        </div>
    )
}