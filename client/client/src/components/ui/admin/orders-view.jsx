import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table,TableBody,TableCell,TableHead,TableHeader, TableRow } from "@/components/ui/table";
import   {Dialog, DialogHeader }  from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetails from "@/pages/admin-view/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "@/store/order-slice";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
export default function AdminOrdersView(){
    const [openDetailsDialog,setOpenDetailsDialog] =useState(false)
    const {orderData , totalPages,limit} = useSelector(state=>state.orderSlice)
    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getOrderDetails()).then(d=>console.log(d)
        )

    },[])
    const handleDialogOpen = (orderId) => {
        setOpenDetailsDialog(orderId); // Set the dialog open for the selected order
    };

    const handleDialogClose = () => {
        setOpenDetailsDialog(null); // Close the dialog
        
    };
    return (
        <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
  <Table>
    <TableHeader>
        <TableRow>
        <TableHead>S No</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead><span className="sr-only">Details</span></TableHead>
        </TableRow>
    </TableHeader>
    <TableBody >
    { orderData?.length > 0 ? orderData.map((orderItem,index)=> (


<TableRow>
<TableCell>{index+1}</TableCell>
    <TableCell>{orderItem?._id}</TableCell>
    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
    <TableCell><Badge className={orderItem?.orderStatus === 'confirmed' ? 'bg-green-300' : 'bg-orange-200'}>{orderItem?.orderStatus}</Badge></TableCell>
    <TableCell>${orderItem?.totalAmount}</TableCell>
    <TableCell>
    <Dialog open={openDetailsDialog === orderItem._id} onOpenChange={() => handleDialogClose()}>
                                <DialogHeader>
                                    <DialogTitle className="sr-only">Order and Shipping information</DialogTitle>
                                </DialogHeader>
                         
                                    <AdminOrderDetails orderItem={orderItem} setOpenDetailsDialog={setOpenDetailsDialog}/>
                                
                            </Dialog>
                            <Button className="bg-yellow-200" onClick={() => handleDialogOpen(orderItem._id)}>View Details</Button></TableCell> 

</TableRow>))  : null
}
    </TableBody>
   </Table>
  </CardContent>
       </Card>
    )
}