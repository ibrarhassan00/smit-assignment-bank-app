import {createSlice} from "@reduxjs/toolkit";
import {otpVerifyThunk} from "./otpVerify.thunk";



const otpVerifySlice = createSlice({
    name:"otpVerify",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(otpVerifyThunk.pending,(state,action)=>{
            state.loading = true
            state.error = null
            state.message = null
        })
        .addCase(otpVerifyThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.message = action.payload.message || "response nahi mila"
         
            
        })
        .addCase(otpVerifyThunk.rejected,(state,action)=>{
             state.error = action.payload?.message || action.error.message
        })
    }
})

const {reducer , actions} = otpVerifySlice;

const otpVerifyReducer = reducer

export default otpVerifyReducer;