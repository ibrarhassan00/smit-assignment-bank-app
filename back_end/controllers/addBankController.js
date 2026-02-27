import {z} from "zod";
import BankModel from "../models/bankSchema.js"

const addBankSchema = z.object({
    bankname: z.string().trim().min(3,{message:"Bank Name Required"}),
    bankcode: z.string().trim().min(1,{message:"Bank Code Required"})
})

export const addBankController = async (req,res)=>{
try {


    const validation = addBankSchema.safeParse(req.body);
    if(!validation.success){
        const firstError = validation?.error?.issues[0]?.message || "Validation Error";
        return res.status(400).json({
            status:false,
            message:firstError
        })  
}
    
    const {bankname , bankcode} = validation.data;
    
    const isExist = await BankModel.findOne({bankcode})

    if(isExist){
        return res.status(409).json({
            status:false,
            message:"Already Exist"
        })
    }
    
const response = await BankModel.create({
    bankname , bankcode
})
    
res.status(201).json({
    status:true,
    message:"Bank Created",
    data:response
})

} catch (error) {
    res.status(500).json({
        status:false,
        message:error.message || "Internal Server Error",
        data:null
    })
}
}

