import apis from "@/utils/apis";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const forgetPassThunk = createAsyncThunk("/forget-password",async(payload,thunkAPI)=>{
try {
    const response = await axios.post(apis().forgetPassword,payload)
    console.log(payload);
        
    return response.data
} catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data||error.message)
}
})
