import apis from "@/utils/apis";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const changePassThunk = createAsyncThunk("/change-password",async(payload,thunkAPI)=>{
try {
    const response = await axios.post(apis().changePassword,payload)
    return response.data
} catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data||error.message)
}
})
