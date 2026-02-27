import bcrypt from "bcryptjs";
import {z} from "zod";
import UserModel from "../../models/User.js";
import jwt from "jsonwebtoken"
const changePasswordSchema = z.object({
    confirmPassword : z.string().trim().min(6,{message:"New password must be at least 6 characters"}),
    token : z.string().trim().min(1,{message:"Unauthorized user"}),

})

const changePasswordController = async (req,res)=>{
try {
    
const validation = changePasswordSchema.safeParse(req.body);


if(!validation.success){
    return res.status(401).json({
        status:false,
        message:validation.error.issues[0].message || "Validation Error"
    })
}

const { confirmPassword , token } = validation.data;

const tokenVerify = jwt.verify(token,process.env.JWT_KEY)

 if (!tokenVerify.email || !tokenVerify._id) {
      return res.status(401).json({
        // 401 Unauthorized
        message: "Invalid Token",
        status: false,
      });
    }

const user = await UserModel.findOne({_id:tokenVerify._id})

if(user.passwordRestFlag == false){
    const hashPassword = await bcrypt.hash(confirmPassword,10)
    const response = await UserModel.findByIdAndUpdate(tokenVerify._id,{password:hashPassword,passwordRestFlag:true})
    return res.status(201).json({
        status:true,
        message:"Password has cahanged"
    })
}else{
  return res.status(401).json({
      message: "Reset link already used",
      status: false,
    });
}

} catch (error) {
        res.status(500).json({
        status:false,
        message:error.message
    })
}
}
export default changePasswordController;