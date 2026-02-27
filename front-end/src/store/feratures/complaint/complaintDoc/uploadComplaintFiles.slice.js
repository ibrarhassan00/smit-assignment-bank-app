import {createSlice} from "@reduxjs/toolkit";
import { uploadComplaintFilesThunk } from "./uploadComplaintFiles.thunk";

const uploadComplaintFilesSlice = createSlice({
    name:"uploadFiles",
    initialState:{
    loading: false,
    error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(uploadComplaintFilesThunk.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(uploadComplaintFilesThunk.fulfilled,(state,action)=>{
            state.loading = false 
            })
            .addCase(uploadComplaintFilesThunk.rejected,(state,action)=>{
             state.loading = false
                state.error = action.payload?.message || action.error.message
            })
    }
})

const {reducer , actions } = uploadComplaintFilesSlice

const uploadComplaintFilesReducer = reducer

export {uploadComplaintFilesReducer}