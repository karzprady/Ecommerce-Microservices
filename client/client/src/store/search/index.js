import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

const initialState={
    searchItems : [],
    keyword : ""
}

   

export const getSearchItems = createAsyncThunk("/getSearchItems", async ({keyword,filters})=>{
     const queryString = ""
      
    
    const res = await axios.get(`http://localhost:3000/api/shop/search/results?q=${keyword}`)
    return res?.data
})
const searchSlice = createSlice({
    name : "shopSlice",
    initialState,
    reducers : {
        resetSearchItems : (state)=>{
            state.searchItems= []
        },
        setKeyword : (state,action)=>{
            state.keyword = action.payload
        } 
    },
    extraReducers  :(builder)=>{

        builder.addCase(getSearchItems.pending,(state)=>{
            state.searchItems=[]
        }).addCase(getSearchItems.fulfilled,(state,action)=>{
            state.searchItems = action.payload.searchItem
            
            
        }).addCase(getSearchItems.rejected,(state)=>{
            state.searchItems = []
        })

    }
})

export default searchSlice.reducer
export const {resetSearchItems,setKeyword} = searchSlice.actions