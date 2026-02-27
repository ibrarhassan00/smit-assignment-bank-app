import { cloudinaryUploader } from "../config/cloudnary.js";
import fs from "fs"
import UserModel from "../models/User.js";
import BankModel from "../models/bankSchema.js";
import ComplaintModel from "../models/complaintsSchema.js";

export const complaintDocController = async (req, res) => {
  //console.log(req.files); // yahan undefine araha hai 
  
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const uploadResult = await cloudinaryUploader.upload(file.path);
      uploadedFiles.push(uploadResult.secure_url);
    }
    console.log(uploadedFiles); // undefine arahah hai 
    



await ComplaintModel.findByIdAndUpdate({_id:req.body.complaintId},{uploadedEvidence:uploadedFiles},
  { new: true })

    return res.status(200).json({
      message: "Uploaded successfully",
      data: uploadedFiles,
    });

  } catch (error) {
    return res.status(500).json({ 
      status:false,
      message: error.message || "Upload failed" });
  }finally{
   if(req.files && req.files.length > 0 ){
    for(const file of req.files){
      fs.unlinkSync(file.path)
      //console.log("finaly done");
      
    }
   }
  }
};
