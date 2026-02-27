import BankModel from "../models/bankSchema.js";

export const bankDropdownController = async(req,res)=>{
try {
    const response = await BankModel.find().select("_id bankname bankcode");

    res.status(200).json({
        status:true,
        message:"bank fatch",
        data : response
    })
    
} catch (error) {
    res.status(500).json({
        status:false,
        message:error.message,
        data:null
    })
}
}