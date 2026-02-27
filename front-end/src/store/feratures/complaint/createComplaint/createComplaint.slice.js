import {createSlice} from "@reduxjs/toolkit";
import { createComplaintThunk } from "./createComplaint.thunk";

const createComplaintSlice = createSlice({
    name:"createComplaint",
    initialState:{
    loading: false,
    error: null,
    API_Response: null,
     complaintId : null,
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(createComplaintThunk.pending,(state,action)=>{
                state.loading = true
                state.error = null
                state.API_Response = null
            })
            .addCase(createComplaintThunk.fulfilled,(state,action)=>{
                state.loading = false
                state.error = null  
                state.API_Response = action.payload.message
                state.complaintId = action.payload.data._id
            })
            .addCase(createComplaintThunk.rejected,(state,action)=>{
             state.loading = false
                state.error = action.payload?.message || action.error.message
            })
    }
})

const {reducer , actions } = createComplaintSlice

const createComplaintReducer = reducer

export {createComplaintReducer}