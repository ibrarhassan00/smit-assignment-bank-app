"use client"

import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from "react-router-dom";
import { changePassThunk } from '@/store/feratures/auth/changePass/changePass.thunk'
import { toast } from 'sonner'
// 1. Zod Schema: Ismein hum check karenge ke dono password match hon
const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "New password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Error confirmPassword field par dikhega
})

const NewPassword = () => {
    const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get("token");
  if (!token) {
  toast.error("Invalid or expired link");
  return;
}
  const navigate = useNavigate()
   const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onBlur",
     defaultValues: {
   password: "",
  confirmPassword: "",
    },
  })

  const onSubmit = async(data) => {
  try {
      const objToSave = {
      token : token,
      confirmPassword : data.confirmPassword
    }
   await dispatch(changePassThunk(objToSave)).unwrap()
   toast.success("Password updated successfully")
   navigate("/login")
  } catch (error) {
    console.log(error.message);
  }
  }

   const changePassState = useSelector((state) => {
        return state.changePassReducer;
      });

    useEffect(() => {
      if (changePassState.error) {
        toast.error(changePassState.error);
      }
    }, [changePassState?.error]);

        useEffect(() => {
      if (changePassState.message) {
        toast.success(changePassState.message);
      }
    }, [changePassState?.message]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-8 text-foreground bg-background">
      
      <div className="text-center mb-8">
        <h1 className='text-4xl font-bold text-primary mb-2'>Update Password</h1>
        <p className="text-muted-foreground text-sm">
          Enter your new password below.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex w-full max-w-sm flex-col gap-5"
      >
        {/* New Password Field */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input 
            type="password" 
            id="password" 
            placeholder="Min 6 characters" 
            {...register("password")} 
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input 
            type="password" 
            id="confirmPassword" 
            placeholder="Repeat new password" 
            {...register("confirmPassword")} 
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Button type="submit" className="w-full">
            Update Password
          </Button>
          
          {/* <Button 
            variant="ghost" 
            type="button" 
            className="w-full justify-start text-muted-foreground font-bold"
          >
            ← Back to Login
          </Button> */}
        </div>
      </form>
    </div>
  )
}

export default NewPassword