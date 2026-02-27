
const apis = ()=>{
    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

    const list ={
        signup : `${baseURL}/user/auth/signup`,
        fatchBankList :`${baseURL}/bank/dropdown`,
        signin : `${baseURL}/user/auth/signin`,
        createComplaint : `${baseURL}/complaint/add`,
        uploadDoc : `${baseURL}/doc/upload`,
        otpVerify : `${baseURL}/user/auth/otp/verify`,
        otpResend : `${baseURL}/user/auth/otp/reset`,
        changePassword : `${baseURL}/user/auth/change-password`,
        forgetPassword : `${baseURL}/user/auth/forget-password`,
        getComplaint: `${baseURL}/complaint/get-all-complaint`
    }

    return list
}

export default apis