import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { otpVerifyThunk } from '@/store/feratures/auth/otpVerify/otpVerify.thunk'
import { toast } from "sonner";
import { otpResendThunk } from '@/store/feratures/auth/resendOtp/resndOtp.thunk'

// 1. Zod Schema (OTP hamesha 6 digits ka hota hai)
const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const OtpPage = () => {
  const dispatch = useDispatch()
    let navigate = useNavigate()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  })
const email = localStorage.getItem("email")

  const onSubmit = async (data) => {
    //console.log("Entered OTP:", data.pin)

    const res = await dispatch(otpVerifyThunk({email:email,otp:data.pin})).unwrap()
    navigate("/login")
    
  } 

  const otpState = useSelector((state) => {
        return state.otpVerifyReducer;
      });

    useEffect(() => {
      if (otpState.error) {
        toast.error(otpState.error);
      }
    }, [otpState?.error]);

        useEffect(() => {
      if (otpState.message) {
        toast.success(otpState.message);
      }
    }, [otpState?.message]);



const otpResedHandler = ()=>{
  dispatch(otpResendThunk({email}))
}


  const resentOtpState = useSelector((state) => {
        return state.otpResendReducer;
      });

    useEffect(() => {
      if (resentOtpState.message) {
        toast.success(resentOtpState.message);
      }
    }, [resentOtpState?.message]);

        useEffect(() => {
      if (resentOtpState.error) {
        toast.error(resentOtpState.error);
      }
    }, [resentOtpState?.error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-8 text-foreground bg-background">
      
      <div className="text-center mb-8">
        <h1 className='text-4xl font-bold text-primary mb-2'>Verify OTP</h1>
        <p className="text-muted-foreground text-sm max-w-75">
          Please enter the 6-digit code sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
        
        <div className="grid gap-3 justify-items-center">
          <Label htmlFor="otp">One-Time Password</Label>
          
          {/* Shadcn InputOTP Component */}
          <InputOTP
            maxLength={6}
            onChange={(value) => setValue("pin", value)} // Value update karne ke liye
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {errors.pin && (
            <p className="text-xs text-destructive">{errors.pin.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full max-w-sm gap-3">
          <Button type="submit" className="w-full">
            Verify Code
          </Button>
          
          <div className="flex flex-col gap-1">
             <Button variant="link" type="button" className="text-sm text-primary" onClick={otpResedHandler}>
                Resend Code?
             </Button>
             <Button variant="ghost" type="button" className="text-muted-foreground font-bold justify-start" onClick={()=>{navigate("/login")}}>
                ← Back to Login
             </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default OtpPage