import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import    axios  from "axios";

const initialState = {
    isLoading : false,
    ProductList : [],

}

export const addProduct = createAsyncThunk("/product/addnewproduct",async(data)=>{
    const res = await axios.post("http://localhost:3000/api/admin/products/addproduct",data,{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
export const fetchAllProducts = createAsyncThunk("/product/addnewproduct",async()=>{
    const res = await axios.get("http://localhost:3000/api/admin/products/getproducts",{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
export const editProduct = createAsyncThunk("/product/addnewproduct",async({data,id})=>{

    
    const res = await axios.put(`http://localhost:3000/api/admin/products/editproduct/${id}`,data,{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
export const deleteProduct = createAsyncThunk("/product/addnewproduct",async({id})=>{
    const res = await axios.delete(`http://localhost:3000/api/admin/products/deleteproduct/${id}`,{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
const AdminProductsSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{

        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            
            
            state.ProductList = action.payload.ListofProduct
            state.isLoading = false
        }).addCase(fetchAllProducts.rejected,(state)=>{
            state.isLoading = false
            state.ProductList=[]
        })

    }
})

export default AdminProductsSlice.reducer