import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./feratures/auth/auth.slice";
import { bankDropdownReducer } from "./feratures/bankDropdown/bankDropdown.slice";
import { signinReducer } from "./feratures/auth/signin/signin.slice";
import { createComplaintReducer } from "./feratures/complaint/createComplaint/createComplaint.slice";
import { uploadComplaintFilesReducer } from "./feratures/complaint/complaintDoc/uploadComplaintFiles.slice";
import otpVerifyReducer from "./feratures/auth/otpVerify/otpVerify.slice";
import otpResendReducer from "./feratures/auth/resendOtp/resndOtp.slice";
import changePassReducer from "./feratures/auth/changePass/changepass.slice";
import forgetPassReducer from "./feratures/auth/forgetPass/forgetpass.slice";
import { getComplaintReducer } from "./feratures/complaint/getCompalint/getComplaint.slice";

const store = configureStore({
reducer:{
    authReducer,
    bankDropdownReducer,
    signinReducer,
    createComplaintReducer,
    uploadComplaintFilesReducer,
    otpVerifyReducer,
    otpResendReducer,
    changePassReducer,
    forgetPassReducer,
    getComplaintReducer,
}
})

export default store