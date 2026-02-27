import {createSlice} from "@reduxjs/toolkit"
import {bankDropdownThunk} from "./bank.thunk"

const bankDropdownSlice = createSlice({
    name:"bank",
    initialState:{
        bank:[],
        loading:false,
        error:null,
        message:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(bankDropdownThunk.pending,(state,{payload})=>{
            state.loading = true;
        })
        builder.addCase(bankDropdownThunk.fulfilled,(state,action)=>{
            state.bank = action.payload.data
            state.message = action.payload.message  
            state.loading = false;
        })
        builder.addCase(bankDropdownThunk.rejected,(state,actions)=>{
            state.error = actions.payload
            state.loading = false;
        })
    }
})



const {reducer,actions} = bankDropdownSlice
const bankDropdownReducer = reducer
export {bankDropdownReducer}