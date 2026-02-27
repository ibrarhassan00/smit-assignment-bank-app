import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    contactNo: { 
      type: String, 
      required: true 
    },
    country: { 
      type: String, 
      required: true 
    },
    gender: { 
      type: String, 
      required: true 
    },
    dob: { 
      type: Date, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role:{
      type:String,
      enum : ["customer","bank_officer","SBP_admin"],
      default:"customer"
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    profileImage:{
      type:String,
      default:null
    },
    isVerified :{
      type:Boolean,
      default:false,
    },
    passwordRestFlag:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true, // Enable timestamps
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
