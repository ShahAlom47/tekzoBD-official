"use client";
import React  from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import Link from "next/link";
import { registerUser } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import { RegisterUser } from "@/Interfaces/userInterfaces";
import PrimaryButton from "@/components/PrimaryButton";



const Register: React.FC = () => {
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
    <div className="flex flex-col justify-center items-center min-h-screen max-w   ">
      <h1 className=" text-xl font-semibold text-black">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-sm w-full space-y-4 p-3  text-brandNeutral max-w-xl "
        >
          {/* Name Field */}
          <div>
            <label className=" ml-2" >User Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-2 py-1 rounded-full bg-transparent border border-brandPrimary text-black outline-none focus:ring-2 focus:brandPrimary"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
             <label  className=" ml-2" >User Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
         className="w-full px-2 py-1 rounded-full bg-transparent border border-brandPrimary text-black outline-none focus:ring-2 focus:brandPrimary"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
             <label className=" ml-2">Password:</label>
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
  className="w-full px-2 py-1 rounded-full bg-transparent border border-brandPrimary text-black outline-none focus:ring-2 focus:brandPrimary"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
               <label className=" ml-2"> Confirm Password:</label>
            <input
              type="text"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
        className="w-full px-2 py-1 rounded-full bg-transparent border border-brandPrimary text-black outline-none focus:ring-2 focus:brandPrimary"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
        
          <PrimaryButton  type="submit" >Register</PrimaryButton>

         

          <p className="flex gap-2 justify-center items-center text-xs text-gray-400 mt-2">
            Already have an account?
            <Link className=" btn-link btn underline hover:scale-105" href="/login">
              Login
            </Link>
          </p>
        </form>
    </div>
  );
};

export default Register;
