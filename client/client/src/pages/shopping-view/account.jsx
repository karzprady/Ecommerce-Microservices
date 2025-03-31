import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import one from "../../assets/one.jpg"
import Orders from "./orders"
import Address from "./address"
import { useState } from "react"
import ShoppingOrders from "./orders"
export default function Account(){
    const [sel,setsel] = useState("address")
    return (
        <div className="flex flex-col ">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={one} className="h-full w-full object-cover object-center" />


            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                <div className="flex flex-col rounded-lg border bg-background p-6">
                    <Tabs defaultValue="orders">
                        <TabsList className="border border-green-700" >
                        <TabsTrigger onClick={()=>setsel("orders")} className={`${sel==="orders"?` bg-fuchsia-200`:``} border  border-r-fuchsia-900`} value="orders">Orders

                        </TabsTrigger>
                        <TabsTrigger onClick={()=>setsel("address")} className={`${sel==="address"?` bg-fuchsia-200`:``} border  border-r-fuchsia-900`}value="address">Address

                        </TabsTrigger>
                        </TabsList>
                        <TabsContent  value="orders">
                           <ShoppingOrders/>
                        </TabsContent>
                        <TabsContent value="address">
                        <Address/>
                        </TabsContent>

                    </Tabs>
                </div>

            </div>

        </div>
    )
}