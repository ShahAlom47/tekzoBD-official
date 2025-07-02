"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";
import { registerUser } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import { RegisterUser } from "@/Interfaces/userInterfaces";



const Register: React.FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUser>();

  const onSubmit = async (data: RegisterUser) => {
  
      try {
    const res = await registerUser({ ...data });
    console.log("Response from server:", res);

    if (res?.success) {
      toast.success(res.message || "Registration successful");
      router.push("/login"); // Redirect to login page after successful registration



    } else {
      toast.error(res.message || "Registration failed");
      console.warn("Server responded with success: false", res);
   

    }
  } catch (error) {
    handleApiError(error);  // Use the centralized error handler
  } finally {
    console.log("Form Data:", data);
  }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e1e2f]  ">
      <AuthCard title="Register" hovered={hovered} setHovered={setHovered}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-sm w-full space-y-4 p-3  "
        >
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="text"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="text"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button font-bold transition duration-200"
          >
            <span className="text-white relative z-20 hover:text-[#ff014f] transition duration-200">
              Register
            </span>
          </button>

         

          <p className="flex gap-2 justify-center items-center text-xs text-gray-400 mt-2">
            Already have an account?
            <Link className="text-white underline hover:scale-105" href="/login">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default Register;
