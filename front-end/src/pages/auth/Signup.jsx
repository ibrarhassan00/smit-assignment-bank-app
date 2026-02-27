"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "@/store/feratures/auth/auth.thunk";
import { bankDropdownThunk } from "../../store/feratures/bankDropdown/bank.thunk";
import axios from "axios";
import { toast } from "sonner";
import apis from "@/utils/apis";

// 1. Zod Schema for Signup
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  contactNo: z
    .string()
    .trim()
    .min(10, { message: "Contact must be at least 10 digits" }),
  country: z.string().trim().min(1, { message: "Please select a country" }),
  bankId: z.string().trim().min(1, { message: "Please select your bank" }),
  role: z.string().trim().min(1, { message: "Please select your role" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Select your gender",
  }),
  dob: z.string().trim().min(1, { message: "Date of Birth is required" }),
});

const Signup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue, // Select ke liye zaroori hai
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      bankId: "", // ✅ MOST IMPORTANT LINE
      country: "", // ✅ MOST IMPORTANT LINE
      role: "", // ✅ MOST IMPORTANT LINE
    },
  });

  const authState = useSelector((state) => {
    return state.authReducer;
  });
  //console.log(authState);

  const onSubmit = async (data) => {
    try {
      await dispatch(signupThunk(data)).unwrap(); // wait for success
      navigate("/login"); // ya jahan le jana ho
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  useEffect(() => {
    if (authState?.message) {
      toast.success(authState.message);
    }
  }, [authState?.message]);

  useEffect(() => {
    if (authState?.error) {
      toast.error(authState.error);
    }
  }, [authState?.error]);

  const bankState = useSelector((state) => {
    return state.bankDropdownReducer;
  });

  const banks = bankState?.bank || [];

  useEffect(() => {
    dispatch(bankDropdownThunk());
  }, [dispatch]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-8 text-foreground bg-background">
      <h1 className="text-4xl mb-5 font-bold text-primary">Create Account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-5"
      >
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            autoComplete="name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            autoComplete="username"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password****"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div className="grid gap-2">
          <Label htmlFor="contact">Contact No</Label>
          <Input
            id="contactNo"
            type="tel"
            autoComplete="new-password"
            placeholder="03XXXXXXXXX"
            {...register("contactNo")}
          />
          {errors.contactNo && (
            <p className="text-xs text-destructive">
              {errors.contactNo.message}
            </p>
          )}
        </div>

        {/* Country Dropdown (Shadcn Select) */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <div className="grid gap-2">
              <Label>Country</Label>
              {/* <Select onValueChange={(value) => setValue("country", value)}> */}
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-xs text-destructive">
                  {errors.country.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Select Bank Dropdown (Shadcn Select) */}
        <Controller
          name="bankId"
          control={control}
          render={({ field: { onChange, value } }) => {
            return  (
            <div className="grid gap-2">
              <Label>Select Your Bank</Label>
              
              <Select
                onValueChange={(bankId) => {
                  onChange(bankId); // select item sy bank_Id aai or react hook ko gai 
                }}
                value={value} // react hook ny wapis bank_Id dia UI render keliye.
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => {
                    return (
                      <SelectItem key={bank._id} value={bank._id}>
                        {bank.bankname}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.bank && (
                <p className="text-xs text-destructive">
                  {errors.bankId.message}
                </p>
              )}
            </div>
          )
          }
            
          }
        />

        {/* Select Role Dropdown (Shadcn Select) */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="grid gap-2">
              <Label>Select Your Role</Label>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="bank_officer">Bank Officer</SelectItem>
                  <SelectItem value="SBP_admin">SBP Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>
          )}
        />
        {/* Date of Birth */}
        <div className="grid gap-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            autoComplete="bday"
            {...register("dob")}
          />
          {errors.dob && (
            <p className="text-xs text-destructive">{errors.dob.message}</p>
          )}
        </div>

        {/* Gender (Radio Buttons) */}
        <div className="grid gap-2">
          <Label>Gender</Label>
          <RadioGroup
            onValueChange={(value) => setValue("gender", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="grid gap-3 mt-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-muted-foreground font-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            ← Back to Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
