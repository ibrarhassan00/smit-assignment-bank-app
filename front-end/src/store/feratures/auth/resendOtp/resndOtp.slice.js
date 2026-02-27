import {createSlice} from "@reduxjs/toolkit";
import {otpResendThunk} from "./resndOtp.thunk";



const otpResndSlice = createSlice({
    name:"otpResend",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(otpResendThunk.pending,(state,action)=>{
            state.loading = true
            state.error = null
            state.message = null
        })
        .addCase(otpResendThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.message = action.payload.message || "response nahi mila"
        })
        .addCase(otpResendThunk.rejected,(state,action)=>{
             state.error = action.payload?.message || action.error.message
        })
    }
})

const {reducer , actions} = otpResndSlice;

const otpResendReducer = reducer

export default otpResendReducer;