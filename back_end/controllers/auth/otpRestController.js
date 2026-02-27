import {z} from "zod";
import newOtp from "../../utils/otp.js"
import sentEmail from "../../utils/email.js";
import OtpModel from "../../models/otp.js";
const resetOtcSchema = z.object({
    email : z.string().trim().email({message:"Required field are missing"})
})

const otpRestController = async(req,res) => {
try {
    
const validation = resetOtcSchema.safeParse(req.body)

if(!validation.success){
    return res.status(401).json({
        status:false,
        message:validation?.error?.issues[0]?.message || "Validation Error"
    })
}

const {email} = validation.data

const otp = newOtp()
sentEmail(email, otp);

await OtpModel.create({email,otp})

   res.status(200).json({
      // 200 OK
      message: "Reset OTP sent successfully",
      status: true,
    });

} catch (error) {
    res.status(500).json({
        status:false,
        message:error.message
    })
}
}

export default otpRestController