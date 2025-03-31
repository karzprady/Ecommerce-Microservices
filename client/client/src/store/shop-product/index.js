import axios from "axios";

import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit"

const initialState = {
    isLoading : false,
    Product : [],
    singleProduct : null,
    filterState:{},
    query : ""
}
export const FilteredProducts = createAsyncThunk("/shop/getfilterproducts",async({filterParams,sortParams})=>{
    const query = new URLSearchParams({
        ...filterParams,
        sortBy : sortParams
    })
    const res = await axios.get(`http://localhost:3000/api/shop/products/getproducts?${query}`,{},{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
export const singleProductDetails = createAsyncThunk("/shop/getParticularProduct",async({id})=>{
    
    const res = await axios.get(`http://localhost:3000/api/shop/products/get/${id}`,{},{
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return res?.data
})
const shopSlice = createSlice({
    name : 'shopSlice',
    initialState,
    reducers : {
        setProductDetails : (state)=>{
            state.singleProduct = null
        },
        setFilterState : (state,action)=>{
           
            
            state.filterState = action.payload
        },
        ResetFilterState : (state)=>{
            state.filterState = null
        },
        buildFilters :  (state,action)=>{
            function BuildQuery(filterParams){
                const queryParam = []
        
        
        
                for (const [k, v] of Object.entries(filterParams)) {
                    if (Array.isArray(v) && v.length > 0) {
                        const paramValue = v.join(",")
                        queryParam.push(`${k}=${encodeURIComponent(paramValue)}`)
                    }
                }
        
                return queryParam.join("&")
        
            }
            state.query =  BuildQuery(action.payload)
        },
        setQuery : (state,action)=>{
            state.query = action.payload

        }
    },
    extraReducers : (builder)=>{
        builder.addCase(FilteredProducts.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(FilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.Product = action.payload.data
           
    
            
        }).addCase(FilteredProducts.rejected,(state)=>{
            state.isLoading = false,
            state.Product= []
        }).addCase(singleProductDetails.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(singleProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.singleProduct = action.payload.data
           
    
            
        }).addCase(singleProductDetails.rejected,(state)=>{
            state.isLoading = false,
            state.singleProduct= null
        })


    }
})

export default shopSlice.reducer
export const {setProductDetails,setFilterState,ResetFilterState,buildFilters,setQuery} = shopSlice.actions