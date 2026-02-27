import { createSlice } from "@reduxjs/toolkit";
import { signinThunk } from "../signin/signin.thnuk";


const signinSlice = createSlice({
  name: "signin",
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinThunk.pending , (state , action)=>{
     state.loading = true
     state.error = null
     state.message = null
    })
    .addCase(signinThunk.fulfilled , (state , action)=>{
     state.loading = false
     state.user = action.payload.data
     state.message = action.payload.message
     state.token = action.payload.token
     
    })
    .addCase(signinThunk.rejected , (state,action)=>{
      state.loading = false
    state.error = action.payload?.message || action.error.message;
    })
  },
});


const { reducer , actions } = signinSlice;

const signinReducer  = reducer

export  {signinReducer}