import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinThunk } from "@/store/feratures/auth/signin/signin.thnuk";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email Required" })
    .email({ message: "Please Insert Valid Email" }),
  password: z
    .string()
    .min(1, { message: "Password Required" }) // Khali field check karne ke liye
    .min(6, { message: "Password should be at least 6 characters" }),
});

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // 2. React Hook Form ko Zod Resolver ke sath connect karein
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const signinState = useSelector((state) => {
    return state.signinReducer;
  });

  useEffect(() => {
    if (signinState.message) {
      toast.success(signinState.message);
    }
  }, [signinState?.message]);

  useEffect(() => {
    if (signinState.error) {
      toast.error(signinState.error);
    }
  }, [signinState?.error]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(signinThunk(data)).unwrap();

      //Token store in Local Storage
      const user = res.token;
      localStorage.setItem("token", user);

       //Navigate to Dashboard
        navigate("/");
     

    } catch (error) {
      if (
        error.message ===
        "Email is not verified Please verify your email address"
      ) {
        localStorage.setItem("email", data.email);
        navigate("/otp/varify");
      }
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-8">
      <h1 className="text-4xl mb-5 font-bold text-primary">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-6"
      >
        {/* Email Field */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="email">Email</Label>
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
        {/* Password Field */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Controller
            name="role"
            control={control}
            render={({ field }) => {
              return (
                <div className="grid gap-2">
                  <Label>Role</Label>
                  {/* <Select onValueChange={(value) => setValue("country", value)}> */}
                  <Select {...field} defaultValue="customer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="bank_officer">Bank_officer</SelectItem>
                      <SelectItem value="SBP_admin">SBP_admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
          <Button
            className="w-full "
            variant="ghost"
            onClick={() => {
              navigate("/signup");
            }}
            type="button"
          >
            Create Account...
          </Button>
          <Button
            className="w-full text-muted-foreground"
            variant="ghost"
            onClick={() => {
              navigate("/forget/password");
            }}
            type="button"
          >
            Forget Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
