import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    reviews : []
}

export const addReviews = createAsyncThunk("/add/review",async(data)=>{
    const res = await axios.post("http://localhost:3000/api/shop/reviews/add",data)
    return res.data
})

export const getReviews = createAsyncThunk("/get/review",async(productId)=>{
    const res = await axios.get(`http://localhost:3000/api/shop/reviews/get/${productId}`)
    return res.data
})

const ReviewSlice = createSlice({
    name : "Review",
    initialState,
    reducers : {
        resetReviews : (state)=>{
            state.reviews = []
        }
    },
    extraReducers : (builder)=>{

        builder.addCase(getReviews.pending,(state)=>{
            state.reviews = []
        }).addCase(getReviews.fulfilled,(state,action)=>{
            state.reviews = action.payload.productReviews
            
            
        }).addCase(getReviews.rejected,(state)=>{
            state.reviews = []
        })

    }
})

export default ReviewSlice.reducer
export const {resetReviews} = ReviewSlice.actions