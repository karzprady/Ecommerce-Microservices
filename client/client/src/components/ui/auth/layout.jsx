import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-28">
              <div className="max-w-md  text-center text-red-400">
                <h1 className="text-4xl font-extrabold tracking-tight">Welcome to Shopping</h1>
              </div>

            </div>
        

          

          
            <div className="flex bg-green-500 flex-1 items-center justify-center bg-background px-4 py-12 sm:px-19 lg:px-18">
                <Outlet/>
            
            </div>
       </div>
    )

}