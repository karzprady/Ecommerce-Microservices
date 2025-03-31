import { AlignJustify, LogOut, Menu } from "lucide-react";
import { Button } from "../button";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/auth-slice";

export default function AdminHeader({setOpen,handleLogout}){
    const dispatch = useDispatch()
    function handleLogout(){
        dispatch(logOut()).then(d=>console.log(d)
        )
    }
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-fuchsia-400 border-b">
            <Button onClick ={()=>setOpen(true)} className="inline-flex gap-2 items-center bg-slate-400 rounded-md px-4 py-2 text-sm font-md shadow hover:bg-pink-800">
            <Menu />
            <span className="sr-only"> Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
            <Button onClick={()=>handleLogout()} className=" inline-flex gap-2 items-center bg-slate-400 rounded-md px-4 py-2 text-sm font-md shadow  hover:bg-pink-800" ><LogOut />Logout</Button>
            </div>
        </header>
    )
}

