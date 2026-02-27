import { z } from "zod";
import ComplaintModel from "../models/complaintsSchema.js";
import mongoose from "mongoose";

const createComplaintSchema = z.object({
  // // Role field (as per your previous requirement)
  // role: z.string().trim().refine((val) => {
  //   return ["customer", "bank_officer", "SBP_admin"].includes(val);
  // }, { message: "Role is not valid" }),

  complaintType: z.string().trim().refine((val) => {
    return ["Complaint", "Fraud"].includes(val);
  }, { message: "Complaint type is required or invalid" }),

  category: z.string().trim().refine((val) => {
    return ["ATM", "Card", "Online Banking", "Branch Banking", "Other"].includes(val);
  }, { message: "Category is required or invalid" }),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  priority: z.string().trim().refine((val) => {
    return ["low", "medium", "high"].includes(val);
  }, { message: "Priority is required or invalid" }),

  status: z.string().trim().refine((val) => {
    return ["In-Process", "Resolved", "Closed", "Rejected"].includes(val);
  }, { message: "Invalid status" }).default("In-Process"),

  // Mongoose ObjectIds are usually validated as strings of 24 hex characters
  bankId: z.string().trim().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Bank ID format",
  }).optional(),

  createdBy: z.string().trim().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid User ID format",
  }).optional(), // Optional because it might be set by the controller

  uploadedEvidence: z.array(z.string()).optional().default([]),
});



export const createComplaintController = async (req,res) => {

  
  try {
    // 1. Zod validation     
    const validatedData = createComplaintSchema.safeParse(req.body); 


if(!validatedData.success){
  let foundError = validatedData.error.issues;
  let errors = foundError.map((e)=>{return e.message})
  return res.status(400).json({
    status:false,
    message: "this is"
  })
}


  //console.log(validatedData);
const { complaintType, category, description, priority, uploadedEvidence } = validatedData.data

    // 2. Create complaint
    const complaint = await ComplaintModel.create({
      ...validatedData.data,
      createdBy: req.user._id, // auth middleware se
      bankId:req.user.bankId
    });

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
};
