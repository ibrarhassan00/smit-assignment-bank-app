import ComplaintModel from "../../models/complaintsSchema.js";

export const fatchComplaintController = async(req,res)=>{
try {
    const user = req.user

const allComplaints = await ComplaintModel.find({createdBy:user._id})

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