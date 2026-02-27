import mongoose from "mongoose";

 const complaintSchema = new mongoose.Schema({
     complaintType: {
      type: String,
      required: true,
      enum: ["Complaint", "Fraud"],
    },
    category: {
      type: String,
      required: true,
      enum: ["ATM", "Card", "Online Banking", "Branch Banking", "Other"],
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: [ "In-Process", "Resolved", "Closed", "Rejected"],
      default: "In-Process",
    },
    uploadedEvidence: {
      type: Array,
      default:null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
  },
  { timestamps: true  
  }
 )

 const ComplaintModel = mongoose.model("complaint", complaintSchema); 

export default ComplaintModel