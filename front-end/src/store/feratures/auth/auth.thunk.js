import apis from "@/utils/apis"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const signupThunk = createAsyncThunk("auth/signup" ,async (payload,{rejectWithValue})=>{
try {
   // console.log(payload);
    
    const res = await axios.post(apis().signup,payload)
    //console.log(res.data);
     return res.data
} catch (error) {
    
    console.log("thunk" , error.response.data.message); //// y wala okay hai 
    
    return rejectWithValue(error.response.data.message)
}
})