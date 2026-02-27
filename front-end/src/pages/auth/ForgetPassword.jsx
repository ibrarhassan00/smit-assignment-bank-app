import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label' // Shadcn wala import
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { forgetPassThunk } from '@/store/feratures/auth/forgetPass/forgetPass.thunk'
// 1. Zod Schema for Forget Password
const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required to reset password" })
    .email({ message: "Please enter a valid email address" }),
})

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const [sendEmail , setSendEmail] = useState(true)
  
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onBlur",
  })

  const onSubmit = (data) => {
    console.log(data.email);
    
    dispatch(forgetPassThunk({...data}))
    setSendEmail(false)
    // Yahan aapki backend API call aayegi
  }

     const forgetPassState = useSelector((state) => {
          return state.forgetPassReducer;
        });
  
      useEffect(() => {
        if (forgetPassState.error) {
          toast.error(forgetPassState.error);
        }
      }, [forgetPassState?.error]);
  
          useEffect(() => {
        if (forgetPassState.message) {
          toast.success(forgetPassState.message);
        }
      }, [forgetPassState?.message]);

      
  return (
    sendEmail ? (<div className="flex min-h-svh flex-col items-center justify-center p-8 text-foreground bg-background">
      
      {/* Icon or Header Section */}
      <div className="text-center mb-8">
        <h1 className='text-4xl font-bold text-primary mb-2'>Forget Password?</h1>
        <p className="text-muted-foreground text-sm max-w-75">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex w-full max-w-sm flex-col gap-6"
      >
        {/* Email Field */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="example@mail.com" 
            {...register("email")} 
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {/* Proceed Button */}
          <Button type="submit" className="w-full">
            Proceed
          </Button>

          {/* Back to Login Button */}
          <Button 
            variant="ghost" 
            type="button" 
            className="w-full justify-start text-muted-foreground font-bold"
            onClick={()=>{navigate("/login")}}
          >
            ← Back to Login
          </Button>
        </div>
      </form>
    </div>  )

    : ( <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 p-4">
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Check Your Email
        </h1>
        <Button type="submit" className="w-full " onClick={()=>{navigate("/login")}}>
           ← Back to Login
          </Button>
      </div>
   
    </div>)
  )
}

export default ForgetPassword