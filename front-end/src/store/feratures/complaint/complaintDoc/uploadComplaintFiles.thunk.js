import apis from "@/utils/apis"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const uploadComplaintFilesThunk = createAsyncThunk("doc/upload",async(payload,thunkAPI)=>{
try {
    const token = localStorage.getItem("token")
//console.log(payload.get("complaintId"));//y undefine araha hai

    const response = await axios.post(apis().uploadDoc,payload,{
        headers:{
                Authorization:`Bearer ${token}`,
            }
    })
    return response.data
} catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
}
})  