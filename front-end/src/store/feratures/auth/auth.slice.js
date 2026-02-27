import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null
        state.message = ""
      })
      .addCase(signupThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(signupThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("Slice", payload); /// yewka okay hai
      });
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

export { authReducer };
