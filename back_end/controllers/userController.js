import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import newOtp from "../utils/otp.js";
import OtpModel from "../models/otp.js";
import sentEmail from "../utils/email.js";

// Zod Schema for input validation
const signupSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Full Name is missing" }),
  email: z.string().trim().email({ message: "Invalid email format" }),
  contactNo: z.string().trim().min(1, { message: "Contact Number is missing" }),
  country: z.string().trim().min(1, { message: "Country is missing" }),
  gender: z.string().trim().min(1, { message: "Gender is missing" }),
  dob: z.string().trim().min(1, { message: "Date of Birth is missing" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z
    .string()
    .trim()
    .refine(
      (val) => {
        return ["customer", "bank_officer", "SBP_admin"].includes(val);
      },
      { message: "Role is not valid" },
    ),
  bankId: z.string().trim().min(1, { message: "Bank is required" }), // ✅ FIX
});

//role: z.enum(["customer","bank_officer","SBP_admin"], {
// errorMap: () => ({ message: "Role is not valid" })
//})

//Object.getOwnPropertyNames()
export const signupController = async (req, res) => {
  try {
    // 1. Zod Validation
    const validation = signupSchema.safeParse(req.body);

    //console.log(Object.getOwnPropertyNames(validation.error.));
    // console.log(typeof validation.error.issues);
    // console.log(validation.error.issues.message);

    if (!validation.success) {
      const firstError =
        validation.error?.issues?.[0]?.message || "Validation Error";

      return res.status(400).json({
        status: false,
        message: firstError,
      });
    }

    const {
      fullName,
      email,
      contactNo,
      country,
      gender,
      dob,
      password,
      role,
      bankId,
    } = validation.data;

    // 2. Check karein user pehle se toh nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email",
      });
    }

    // 3. Password Hash karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const objToSave = {
      fullName,
      email,
      contactNo,
      country,
      gender,
      dob,
      password: hashedPassword,
      role,
      bankId,
    };
    // 4. User DB mein create karein

    const newUser = await User.create({ ...objToSave });

    const otp = newOtp();

    const otpObject = {
      email: email,
      otp: otp,
    };

    await OtpModel.create(otpObject);

    sentEmail(email, otp);

    res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Zod Schema for input validation
const signinSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const singninController = async (req, res) => {
  try {
    const validation = signinSchema.safeParse(req.body);
    if (!validation.success) {
      const fristError =
        validation?.error?.issues[0]?.message || "Validation Error";
      return res.status(400).json({
        status: false,
        message: fristError,
      });
    }

    const { email, password } = validation.data;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email And Password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: "Invalid Email And Password",
      });
    }

console.log(existingUser.isVerified);


    if(existingUser.isVerified === false){
return res.status(401).json({
  status:false,
  message:"Email is not verified Please verify your email address"
})
}

    const userdata = existingUser.toObject();
    delete userdata.password;

    console.log(userdata);
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: true,
      message: "Successfully Login",
      data: userdata,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: { message: "Server Error", error: error.message },
    });
  }
};

export const userFatch = async (req, res) => {
  try {
    const response = await UserModel.find().populate("bankId");
    console.log(response);

    res.status(200).json({
      status: true,
      message: "All User Data Fatch Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error" || error.message,
      data: null,
    });
  }
};
