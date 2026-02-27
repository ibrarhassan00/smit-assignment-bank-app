import apis from "@/utils/apis";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const signinThunk = createAsyncThunk("/user/signin",async(payload,{rejectWithValue})=>{
    try {
        const response = await axios.post(apis().signin,payload)
        return response.data

    } catch (error) {
        console.log(error.response.data.message);
        
        return rejectWithValue(error.response.data)
    }
})