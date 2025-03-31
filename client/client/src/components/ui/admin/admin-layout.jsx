import AdminSideBar from "./side-bar";
import AdminHeader from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
export default function AdminLayout(){
    const [open,setOpen] = useState(false)
    return(
        <div className="flex min-h-screen w-full bg-black text-fuchsia-500">
        {/* sidebar */}
        <AdminSideBar open={open} setOpen={setOpen}/>
        <div className="flex flex-1 flex-col">
            {/* admin header */}
            <AdminHeader setOpen={setOpen}/>
            <main className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6">
            <Outlet/>
            </main>
            
            </div>
        </div>
    )
}
