import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    isLoading : false,
}

export const addToCart = createAsyncThunk("/cart/addcart",
    async({userId,productId,quantity})=>{
        const res = await axios.post("http://localhost:3000/api/shop/cart/add",{userId,productId,quantity},{
            headers : {
                'Content-Type' : "application/json"
            }
        })

        return res.data
    }
)

export const getCart = createAsyncThunk("/cart/getcart",
    async({userId})=>{
        const res = await axios.get(`http://localhost:3000/api/shop/cart/get/${userId}`,{},{
            headers : {
                'Content-Type' : "application/json"
            }
        })

        return res.data
    }
)


export const UpdateCart = createAsyncThunk("/cart/updatecart",
    async({userId,productId,quantity})=>{
        const res = await axios.put(`http://localhost:3000/api/shop/cart/update-cart`,{userId,productId,quantity},{
            headers : {
                'Content-Type' : "application/json"
            }
        })

        return res.data
    }
)


export const DeleteCart = createAsyncThunk("/cart/deletecart",
    async({userId,productId})=>{
        const res = await axios.delete(`http://localhost:3000/api/shop/cart/delete/${userId}/${productId}`,{},{
            headers : {
                'Content-Type' : "application/json"
            }
        })

        return res.data
    }
)

const cartSlice = createSlice({
    name : 'cartSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
     builder.addCase(addToCart.pending,(state)=>{
        state.isLoading = true
     }).addCase(addToCart.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.cartItems = action.payload.data

     }).addCase(addToCart.rejected,(state)=>{
        state.isLoading = false
        state.cartItems = []
     }).addCase(getCart.pending,(state)=>{
        state.isLoading = true
     }).addCase(getCart.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.cartItems = action.payload.data

     }).addCase(getCart.rejected,(state)=>{
        state.isLoading = false
        state.cartItems = []
     }).addCase(UpdateCart.pending,(state)=>{
        state.isLoading = true
     }).addCase(UpdateCart.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.cartItems = action.payload.data

     }).addCase(UpdateCart.rejected,(state)=>{
        state.isLoading = false
        state.cartItems = []
     }).addCase(DeleteCart.pending,(state)=>{
        state.isLoading = true
     }).addCase(DeleteCart.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.cartItems = action.payload.data

     }).addCase(DeleteCart.rejected,(state)=>{
        state.isLoading = false
        state.cartItems = []
     })
    }
})

export default cartSlice.reducer