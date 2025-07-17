"use client";
import React from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/"; // default: home

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        toast.success("Logged in successfully!");
        router.push(redirectPath);
      } else {
        const rawError = res?.error || "";

        if (rawError.includes("EC6B0000") || rawError.includes("ssl")) {
          toast.error(
            "Secure connection failed. Please check your internet or try again later."
          );
        } else if (rawError.includes("No account")) {
          toast.error("No account found with this email.");
        } else if (rawError.includes("Incorrect password")) {
          toast.error("The password you entered is incorrect.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Something went wrong during login. Please check your network and try again."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <h1 className="text-xl font-semibold text-black">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm w-full space-y-4 p-3 text-brandNeutral max-w-2xl"
      >
        {/* Email Field */}
        <div>
          <label className="ml-2">User Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-2 py-1 rounded-full bg-transparent border border-brandNeutral text-black outline-none focus:ring-2 focus:brandPrimary"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="ml-2">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-2 py-1 rounded-full bg-transparent border border-brandNeutral text-black outline-none focus:ring-2 focus:brandPrimary"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <PrimaryButton type="submit">Login</PrimaryButton>

        {/* Links */}
        <div className="flex gap-2 flex-wrap items-center mt-2">
          <p className="text-xs text-gray-400">
            Don’t have an account?
            <Link
              className="underline hover:scale-105 ml-1"
              href="/register"
            >
              Register
            </Link>
            .
          </p>

          <Link
            className="underline hover:scale-105 text-xs"
            href="/forgetPassword"
          >
            Lost your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
