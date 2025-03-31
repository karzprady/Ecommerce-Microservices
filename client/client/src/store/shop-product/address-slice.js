import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading : false,
    addList : []
}
export const addAddress = createAsyncThunk("/add/address",
    async({formData})=>{
        const res = await axios.post("http://localhost:3000/api/shop/address/add",formData)
        return res.data
    }
)

export const getAddress = createAsyncThunk("/get/address",
    async({userId})=>{
        const res = await axios.get(`http://localhost:3000/api/shop/address/get/${userId}`,{})
        return res.data
    }
)

export const editAddress = createAsyncThunk("/edit/address",
    async({userId,addressId,formData})=>{
        const res = await axios.put(`http://localhost:3000/api/shop/address/edit/${userId}/${addressId}`,formData)
        return res.data
    }
)

export const delAddress = createAsyncThunk("/del/address",
    async({userId,addressId})=>{
        const res = await axios.delete(`http://localhost:3000/api/shop/address/del/${userId}/${addressId}`,{})
        return res.data
    }
)


const addressSlice = createSlice({
    name : "addSlice",
    initialState,
    reducers : {},
    extraReducers : (builders)=>{
        builders.addCase(addAddress.pending,(state)=>{
            state.isLoading = true
        }).addCase(addAddress.fulfilled,(state,action)=>{
            state.isLoading = false
             
            
            
        }).addCase(addAddress.rejected,(state)=>{
            state.isLoading = false
         
        }).addCase(getAddress.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAddress.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.addList = action.payload.data 
        }).addCase(getAddress.rejected,(state)=>{
            state.isLoading = false,
            state.addList =[]
        })

    }
})

export default addressSlice.reducer