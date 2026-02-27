import {z} from "zod";
import UserModel from "../../models/User.js";
import jwt from "jsonwebtoken";
import sentEmailForgetPassword from "../../utils/forgetPasswordEmail.js";

import dotenv from "dotenv"
dotenv.config()

const forgetPasswordSchema = z.object({
email: z.string().trim().email({message:"Required Field Are Missing"})
})

const forgetPasswordController = async(req,res)=>{
    try {    
    const validation = forgetPasswordSchema.safeParse(req.body)
    console.log(req.body);
    
    if(!validation.success){
    return res.status(401).json({
        status:false,
        message: validation?.error?.issues[0]?.message || " Validaction Error"
    })
}

const {email} = validation.data
const isUserExist = await UserModel.findOne({email})
if(!isUserExist){
    return res.status(401).json({
        status:false,
        message:"Invalid Email"
    })
}

await UserModel.findOneAndUpdate({email},{passwordRestFlag:false})
const token = jwt.sign({_id:isUserExist._id , email:email},process.env.JWT_KEY,{expiresIn :"10m"})
const url = `${process.env.FRONT_END_URL}/new/password?token=${token}`
sentEmailForgetPassword(email , url)

res.status(200).json({
    status:true,
    message:"Please check your email"
})
    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

export default forgetPasswordController