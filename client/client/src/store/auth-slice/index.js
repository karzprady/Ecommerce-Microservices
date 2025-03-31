
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated : false,
    isLoading : true,
}
export const checkAuth = createAsyncThunk("/auth/checkauth",
    async()=>{
        const response = await axios.get("http://localhost:3000/api/user/checkauth",{
            withCredentials : true,
            headers : {
                'Cache-Control' : "no-store, no-cache , must-revalidate, proxy-revalidate",
            }
        })
        return response.data
    }
)

export const registerUser = createAsyncThunk("/auth/register",
    async(formData, { rejectWithValue })=>{
        try{
        
        const response = await axios.post("http://localhost:3000/api/user/register",formData,{
            withCredentials : true
        })
        return response.data
    }
    catch(e){
        return rejectWithValue(e.response.data)
    }
    }   
)

export const loginUser = createAsyncThunk("/auth/login",
    async(formData,{ rejectWithValue })=>{
        try{
        const res = await axios.post("http://localhost:3000/api/user/login",formData,{
            withCredentials : true
        })
        return res.data
    }
    catch(e){
        
        return rejectWithValue(e.response.data)
        
    }
    }
   
)
export const logOut = createAsyncThunk("/auth/logout",
    async()=>{
        
        const res = await axios.post("http://localhost:3000/api/user/logout",{},{
            withCredentials : true
        })
        return res.data
    
    }
   
)
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        setUser:(state,action)=>{
            

        }

    },
    extraReducers : (builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isAuthenticated = false,
            state.isLoading=false
            state.user = null
        }).addCase(registerUser.rejected,(state)=>{
            state.isAuthenticated = false,
            state.isLoading= true,
            state.user = null
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isAuthenticated = action.payload.success
            state.isLoading =  false
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(loginUser.rejected,(state)=>{
            state.isAuthenticated= false,
            state.isLoading = false,
            state.user = null
        }).addCase(checkAuth.pending,(state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isAuthenticated = action.payload.success
            state.isLoading =  false
            state.user = action.payload.success ? action.payload.user : null
        }).addCase(checkAuth.rejected,(state)=>{
            state.isAuthenticated= false,
            state.isLoading = false,
            state.user = null
        }).addCase(logOut.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated = false;
            state.user = null
        })

    }
})

export const {setUser} = authSlice.actions
export default authSlice.reducer
