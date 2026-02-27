import {createSlice} from "@reduxjs/toolkit";
import { getComplaintThunk } from "./getCompalint.thunk";

const getComplaintSlice = createSlice({
    name:"createComplaint",
    initialState:{
    loading: false,
    error: null,
    API_Response: null,
    //  complaintId : null,
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(getComplaintThunk.pending,(state,action)=>{
                state.loading = true
                state.error = null
                state.API_Response = null
            })
            .addCase(getComplaintThunk.fulfilled,(state,action)=>{
                state.loading = false
                state.error = null  
                state.API_Response = action.payload.data
                // state.complaintId = action.payload.data._id
            })
            .addCase(getComplaintThunk.rejected,(state,action)=>{
             state.loading = false
                state.error = action.payload?.message || action.error.message
            })
    }
})

const {reducer , actions } = getComplaintSlice

const getComplaintReducer = reducer

export {getComplaintReducer}