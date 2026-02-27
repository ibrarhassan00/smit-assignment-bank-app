import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    bankname : {
        type : String,
        required : true,
    },
    bankcode : {
        type:String,
        required:true
    }
},{timestamps:true})

const BankModel = mongoose.model("bank",bankSchema)

export default BankModel    