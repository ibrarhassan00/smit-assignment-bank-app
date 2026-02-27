import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";


const customerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    const isVerify = jwt.verify(token, process.env.JWT_KEY);
  
    
    if (!isVerify) {
     return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }

    const user = await UserModel.findById({_id:isVerify._id}).select("role bankId")
   if(!user){
     return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
   }

if(user.role == "customer"){
    req.user = user
    next()
}else{
    return res.status(401).json({
        status:false,
        message:"Permission Denied"
    })
}


  } catch (error) {
    return res.status(401).json({
        status:false,
        message: error.message || "UnAuth User yes",

    })
  }
};

export default customerAuth