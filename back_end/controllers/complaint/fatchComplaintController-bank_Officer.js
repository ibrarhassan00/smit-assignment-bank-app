import ComplaintModel from "../../models/complaintsSchema.js";

export const fatchComplaintControllerBank_Officer = async(req,res)=>{
try {
    const user = req.user

const allComplaints = await ComplaintModel.find({bankId:user.bankId})

    res.json({
        data:allComplaints
    })
    
} catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error" || error.message,
      data: null,
    });
}
}