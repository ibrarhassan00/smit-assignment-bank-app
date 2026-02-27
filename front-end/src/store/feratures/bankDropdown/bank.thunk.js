import apis from "@/utils/apis";
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const bankDropdownThunk = createAsyncThunk("bank/dropdown",async(payload,{rejectWithValue})=>{
try {
    const response = await axios.get(apis().fatchBankList)
    //console.log(response.data);
    return response.data;
} catch (error) {
    return rejectWithValue(error.message)
}
})