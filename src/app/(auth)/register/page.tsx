"use client";
import React from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import { RegisterUser } from "@/Interfaces/userInterfaces";
import PrimaryButton from "@/components/PrimaryButton";
import { registerUser } from "@/lib/allApiRequest/authRequest/authRequest";
import PasswordInput from "@/components/PasswordInput";
import { signIn } from "next-auth/react";
import SocialLogin from "@/components/SocialLogin";

const Register: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUser>();

  const password = watch("password");

  const onSubmit = async (data: RegisterUser) => {
    try {
      // 1️⃣ প্রথমে user register হবে
      const res = await registerUser({ ...data });
      console.log("Server Response:", res);

      if (res?.success) {
        toast.success(res.message || "Registration successful");

        // 2️⃣ তারপর automatic login করানো হবে
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginRes?.ok) {
          toast.success("Logged in successfully!");
          router.push("/"); // home বা যেকোন default route
        } else {
          toast.error("Registration successful, but login failed. Please login manually.");
          router.push("/login");
        }
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      handleApiError(error);
      console.error("Registration error:", error);
    } finally {
      console.log("Form Submitted Data:", data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w">
      <h1 className="text-xl font-semibold text-black">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm w-full space-y-4 p-3 text-brandNeutral max-w-xl"
      >
        {/* Name Field */}
        <div>
          <label className="ml-2">User Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-2 py-1 rounded-full bg-transparent border border-brandNeutral text-black outline-none focus:ring-2 focus:brandPrimary"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="ml-2">User Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-2 py-1 rounded-full bg-transparent border border-brandNeutral text-black outline-none focus:ring-2 focus:brandPrimary"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <PasswordInput
          label="Password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          error={errors.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />

        {/* Submit Button */}
        <PrimaryButton type="submit">Register</PrimaryButton>
        <SocialLogin />

        {/* Links */}
        <p className="flex gap-2 justify-center items-center text-xs text-gray-400 mt-2">
          Already have an account?
          <Link className="btn-link btn underline hover:scale-105" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
