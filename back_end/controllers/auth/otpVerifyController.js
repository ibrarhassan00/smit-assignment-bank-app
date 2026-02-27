import {z} from "zod"
import OtpModel from "../../models/otp.js"
import UserModel from "../../models/User.js"


const otpSchema = z.object({
    email : z.string().trim().email({message:"Required field are missing"}),
    otp: z.string().trim().min(6,{message:"Required field are missing"})
})

const otpVerifyController = async(req,res)=>{
try {
     
    const validation = otpSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({
            status:false,
            message: validation?.error?.issues[0]?.message || "Validation Error"
        })
    }

    const {email , otp} = validation.data

const isExist = await OtpModel.findOne({email , isUsed : false }).sort({createdAt:-1})

if(!isExist){
    return res.status(401).json({
        status:false,
        message:"OTP not found or already used"
    })
}


//console.log( otp);

console.log(isExist.otp);
console.log(otp);

if(isExist.otp !== otp){
return res.status(401).json({
    status:false,
    message:"Invalid OTP"
})
}

 const tenMinutes = 10 * 60 * 1000
    if (Date.now() - isExist.createdAt.getTime() > tenMinutes) {
      return res.status(401).json({
        status: false,
        message: "OTP expired"
      })
    }



await OtpModel.findByIdAndUpdate(isExist.id , {isUsed:true});
await UserModel.findOneAndUpdate({email},{isVerified:true} );

res.status(200).json({
    status:true,
    message : "OTP Verify" 
})



} catch (error) {
    res.status(500).json({
        status:false,
        error:error.message
    })
}
}

export default otpVerifyController