import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { logOut } from "../auth-slice"

const initialState = {
    approvalURL : null,
    isLoading : false,
    orderId : null,
    orderData : [],
    totalPages : "",
    limit : "",
}
export const getAllOrdersByUser = createAsyncThunk("/order/getAllOrdersByUser",async({userId,OrderFormData})=>{
   let finalString = ""
   
   
  Object.keys(OrderFormData).map(k=>{
   finalString+=`${k}=${OrderFormData[k]}&`
  })
 
    const res = await axios.get(`http://localhost:3000/api/shop/order/userorders/${userId}?${finalString}`)
    return res.data
}) 
export const getOrderDetails = createAsyncThunk("/order/getOrderDetails",async()=>{
    const res = await axios.get('http://localhost:3000/api/shop/order/allorders',{}
    )
    return res.data
})
export const createNewOrder = createAsyncThunk("/order/createneworder",async(orderdata)=>{
    const res = await axios.post('http://localhost:3000/api/shop/order/create',orderdata,{
        headers: {
            'Content-Security-Policy': "script-src 'self' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com https://www.gstatic.com"
          }}
    )
    return res.data
})

export const UpdateOrderDetails = createAsyncThunk("/order/UpdateOrderDetails",async({orderId,status})=>{
   const res = await axios.post('http://localhost:3000/api/shop/order/updateOrder',{orderId,status})
   return res.data
})



export const capturePayment = createAsyncThunk("/order/capturePayment",async({paymentId,payerId,orderId})=>{
    const res = await axios.post('http://localhost:3000/api/shop/order/capture',{paymentId,payerId,orderId},{
        headers: {
            'Content-Security-Policy': "script-src 'self' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com https://www.gstatic.com"
          }}
    )
    return res.data
})

const orderSlice = createSlice({
    name : 'orderSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
     builder.addCase(createNewOrder.pending,(state)=>{
        state.isLoading = true
     }).addCase(createNewOrder.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.approvalURL  = action.payload.approvalURL,
        state.orderId  = action.payload.orderId
        sessionStorage.setItem("currentorderid",JSON.stringify(action.payload.orderId))
     }).addCase(createNewOrder.rejected,(state,action)=>{
        state.isLoading = true,
        state.approvalURL  = null,
        state.orderId = null
     }).addCase(getAllOrdersByUser.pending,(state)=>{
        state.orderData = []
     }).addCase(getAllOrdersByUser.fulfilled,(state,action)=>{
        state.orderData = action.payload.data
        state.totalPages = action.payload.totalPages
        state.limit = action.payload.limit
     }).addCase(getAllOrdersByUser.rejected,(state)=>{
        state.orderData = []
     }).addCase(getOrderDetails.pending,(state)=>{
        state.orderData = []
     }).addCase(getOrderDetails.fulfilled,(state,action)=>{
        state.orderData = action.payload.data
     }).addCase(getOrderDetails.rejected,(state)=>{
        state.orderData = []
     })
    }

})

export default orderSlice.reducer