import { LogOut, Menu, ShoppingCart, Store, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { Button } from "../button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel , DropdownMenuSeparator, DropdownMenuTrigger} from "../dropdown-menu";

import { Avatar, AvatarFallback } from "../avatar";
import { logOut } from "@/store/auth-slice";
import UserCartItemsContent from "@/components/ui/shopping/cart-items-content";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { getCart } from "@/store/cart-slice";
import { Label } from "../label";
import { FilteredProducts, ResetFilterState, setFilterState } from "@/store/shop-product";
import Search from "./search";


function MenuItems(){
    const nav = useNavigate()
    
    let {filterState} = useSelector(state=>state.shopSlice)
    const dispatch = useDispatch()
   
    
    
    
    

    function handleNavigate(curItem){

        let excludeItems = ["Home" , "Top items"]
        
        sessionStorage.removeItem('filters')
        const curFilter = excludeItems.includes(curItem.id) ? null : {
          category : [curItem.id]
        } 
        
        
       if(curFilter) {
         dispatch(setFilterState(curFilter))  
       sessionStorage.setItem('filters',JSON.stringify(curFilter))
    }
    else{
    dispatch(ResetFilterState())
    }
        nav(curItem.path)
    
    
    
    
    
      }
    return <nav className="flex flex-col lg:mb-0 items-center lg:justify-between gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(i=><Label  onClick={()=>handleNavigate(i)} className="text-sm font-medium"key={i.id}>{i.label}</Label>)
        }
    </nav>
}

function HeaderRightContent({user,dispatch}){
    const {cartItems} = useSelector(state=>state.cartSlice)
  
    const nav = useNavigate()
    
   
    const [opencart,setopencart] = useState(false)
    
    function handleLogout(){
        dispatch(logOut()).then(d=>console.log(d)
        )

    }
    return <div className="flex flex-col  lg:items-center  gap-4 lg:flex-row">
           <Sheet open={opencart} onOpenChange={()=>setopencart(false)}>
           <Button  onClick ={()=>setopencart(true)}variant="outline" size="icon">
            <ShoppingCart className=" lg:w-6 h-6 "/>
            <span className="sr-only">shopping cart</span></Button>
            <UserCartWrapper setopencart={setopencart} cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}/>
           </Sheet>
            
            <DropdownMenu >
                <DropdownMenuTrigger asChild >
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                          {user?.username?.[0]}
                        </AvatarFallback>

                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56 bg-white">
                    <DropdownMenuLabel>
                        Logged in as {user.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                    <UserRound onClick={()=>nav("/shopping/account")} className="mr-2 h-4 w-4" />
                    Account 
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem><LogOut  onClick={()=>handleLogout()}className="mr-2 h-4 w-4 cursor-pointer" /> Logout
                    </DropdownMenuItem>
                    

                </DropdownMenuContent>
        </DropdownMenu>

    </div>
}

export default function ShoppingHeader(){
    const {isAuthenticated,user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
   
    useEffect(()=>{
        dispatch(getCart({userId : user?.userId}))
    },[])
    
    return (
        <header className="z-40 top-0 w-full border-b bg-background sticky">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shopping/home"className="flex item-centre gap-2"> 
                <Store  className="h-6 w-6"/>
                <span className="font-bold">Ecommerce</span>
                </Link>
                <Sheet className="">
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <div className="flex flex-col items-center justify-between gap-4">
                        <MenuItems/>
                        <HeaderRightContent user={user} dispatch={dispatch}/>

                        </div>
                    
                    </SheetContent>
                </Sheet>
                <div className=" hidden lg:block ">
                <MenuItems/>
            
                </div>
                
                <Search/>
                
                    <div className="hidden lg:block"><HeaderRightContent user={user} dispatch={dispatch}/></div> 
                
                
            </div>

        </header>
    )
}