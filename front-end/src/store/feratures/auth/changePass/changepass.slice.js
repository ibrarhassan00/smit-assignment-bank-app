import {createSlice} from "@reduxjs/toolkit";
import {changePassThunk} from "./changePass.thunk";



const changePassSlice = createSlice({
    name:"changePass",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(changePassThunk.pending,(state,action)=>{
            state.loading = true
            state.error = null
            state.message = null
        })
        .addCase(changePassThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.message = action.payload.message || "response nahi mila"
        })
        .addCase(changePassThunk.rejected,(state,action)=>{
             state.error = action.payload?.message || action.error.message
        })
    }
})

const {reducer , actions} = changePassSlice;

const changePassReducer = reducer

export default changePassReducer;