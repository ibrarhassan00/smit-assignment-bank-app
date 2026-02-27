import {createSlice} from "@reduxjs/toolkit";
import {forgetPassThunk} from "./forgetPass.thunk";



const forgetPassSlice = createSlice({
    name:"forgetPass",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(forgetPassThunk.pending,(state,action)=>{
            state.loading = true
            state.error = null
            state.message = null
        })
        .addCase(forgetPassThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.message = action.payload.message || "response nahi mila"
        })
        .addCase(forgetPassThunk.rejected,(state,action)=>{
             state.error = action.payload?.message || action.error.message
        })
    }
})

const {reducer , actions} = forgetPassSlice;

const forgetPassReducer = reducer

export default forgetPassReducer;