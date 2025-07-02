"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const router = useRouter();

const session = useSession()

console.log(session)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    
    console.log("Login response:", res);

 if (res?.ok) {
  toast.success("Logged in successfully!");
  router.push("/");
} else {
  const rawError = res?.error || "";

  if (rawError.includes("EC6B0000") || rawError.includes("ssl")) {
    toast.error("Secure connection failed. Please check your internet or try again later.");
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
    toast.error("Something went wrong during login. Please check your network and try again.");
  }
};
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1e1e2f] ">
      <AuthCard title="login" hovered={hovered} setHovered={setHovered}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-sm w-full space-y-4 p-3  "
        >
          <div>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
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
              className="w-full px-2 py-1 rounded-full bg-gray-900 border border-gray-50 outline-none focus:ring focus:ring-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="auth-button font-bold transition duration-200"
          >
            <span className="text-white relative z-20 hover:text-[#ff014f] transition duration-200">
              Login
            </span>
          </button>

          <p className="flex gap-2 justify-center items-center text-xs text-gray-400 mt-2">
            Don’t have an account?
            <Link className="text-white underline hover:scale-105" href="/register">
              Register
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
