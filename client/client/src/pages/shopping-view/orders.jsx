import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Table,TableBody,TableCell,TableHead,TableHeader, TableRow } from "@/components/ui/table";
import ShoppingOrderDetails from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/order-slice";
import { DialogTitle } from "@radix-ui/react-dialog";
import Form from "@/components/ui/common-components/form";
import { FiltersForOrders } from "@/config";
import AdvancedPagination from "./AdvancePagination";


export default function ShoppingOrders(){
    const [currentPage, setCurrentPage] = useState(1);
   const [OrderFormData,setOrderFormData] = useState({
    price : "",
    status : "",
    date : "",
    page : 1,
   })

   
   useEffect(()=>{
    dispatch(getAllOrdersByUser({userId: user.userId,OrderFormData})).then(d=>console.log(d)
)
   } , [currentPage])
    
   OrderFormData.page = currentPage

   function handleSubmit(e){
    
    e.preventDefault()
    
    dispatch(getAllOrdersByUser({userId: user.userId,OrderFormData})).then(d=>console.log(d)
)
   }

   
    
    const [openDialog, setOpenDialog] = useState(null);
    const {user} = useSelector(state=>state.auth)
    const {orderData , totalPages,limit} = useSelector(state=>state.orderSlice)
 
    
    const dispatch = useDispatch()
   
    
    const pagination = Math.ceil(totalPages/limit);
    

    let pages = []
    for(let i=1;i<pagination+1;i++){
        pages.push(i)
    }
    

   
     

    useEffect(()=>{
        let userId =user.userId;
        
        
        if(userId){
            dispatch(getAllOrdersByUser({userId,
                 OrderFormData}))
                 
        }
    },[])


    

    

    const handleDialogOpen = (orderId) => {
        setOpenDialog(orderId); // Set the dialog open for the selected order
    };

    const handleDialogClose = () => {
        setOpenDialog(null); // Close the dialog
    };
    return ( 

<div className="relative mb-12">


<div className="mb-3 shadow-lg rounded-lg">
    
          
<Form registerFormControls ={FiltersForOrders} formData={OrderFormData} setFormData={setOrderFormData}  onSubmit={handleSubmit} styling={'bg-slate-400 flex gap-4'}/>

</div> 
       
   <Card>
    <CardHeader>
        <CardTitle>Order History</CardTitle>
    </CardHeader>
  <CardContent>
  <Table>
    <TableHeader>
        <TableRow>
            <TableHead>Order ID </TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead><span className="sr-only">Details</span></TableHead>
        </TableRow>
    </TableHeader>
    
    <TableBody>
        { orderData?.length > 0 ? orderData.map(orderItem=> (


        <TableRow>
            
            <TableCell>{orderItem?._id}</TableCell>
            <TableCell>{orderItem?.orderDate}</TableCell>
            <TableCell>{orderItem?.orderStatus}</TableCell>
            <TableCell>${orderItem?.totalAmount}</TableCell>
            <TableCell>
            <Dialog open={openDialog === orderItem._id} onOpenChange={() => handleDialogClose()}>
                                        <DialogHeader>
                                            <DialogTitle className="sr-only">Order and Shipping information</DialogTitle>
                                        </DialogHeader>
                                        {openDialog === orderItem._id && (
                                            <ShoppingOrderDetails orderItem={orderItem} />
                                        )}
                                    </Dialog>
                                    <Button onClick={() => handleDialogOpen(orderItem._id)}>View Details</Button></TableCell> 

        </TableRow>))  : null
}
    </TableBody>
   </Table>
  </CardContent>
   
   </Card>
   <div className="justify-items-center items-center mt-4">
         
       <AdvancedPagination totalPages={pagination} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
   </div>
   </div>
)
}