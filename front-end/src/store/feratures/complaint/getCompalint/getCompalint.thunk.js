import apis from "@/utils/apis"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const getComplaintThunk = createAsyncThunk("get/complaint",async(payload,thunkAPI)=>{
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(apis().getComplaint,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})  