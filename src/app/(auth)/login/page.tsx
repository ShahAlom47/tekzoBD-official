"use client";
import React from "react";
import { useForm } from "react-hook-form";
import "../../../style/authpage.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();

  const session = useSession();


  console.log(session);

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
        // await addWishlistToDB( data.email);
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
    <div className="flex flex-col justify-center items-center min-h-[90vh] max-w  ">
      <h1 className=" text-xl font-semibold text-black">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm w-full space-y-4 p-3 text-brandNeutral  max-w-2xl "
      >
        <div>
          <label className=" ml-2">User Email:</label>
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

        <div>
          <label className=" ml-2">Password:</label>
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

        <div className=" flex gap-2  flex-wrap items-center mt-2">
          <p className="flex  justify-center items-center text-xs text-gray-400 ">
            Don’t have an account?
            <Link
              className=" btn-link btn underline hover:scale-105"
              href="/register"
            >
              Register
            </Link> .
          </p>

          <Link
            className=" btn-link btn underline hover:scale-105"
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
