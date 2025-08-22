"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const SocialLogin: React.FC = () => {
  const handleSocialLogin = async (provider: string) => {
    try {
      const res = await signIn(provider, { redirect: false, callbackUrl: "/" });

      if (res?.error) {
        toast.error("Login failed. Please try again.");
        console.error("Social login error:", res.error);
      } else {
        toast.success("Logged in successfully!");
        // redirect manually if needed
        if (res?.url) {
          window.location.href = res.url;
        }
      }
    } catch (error) {
      console.error("Social login exception:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button
        className="btn-bordered rounded-full w-10 h-10 p-1 text-red-600 hover:bg-red-50 transition"
        onClick={() => handleSocialLogin("google")}
      >
        <FcGoogle className="text-2xl" />
      </button>
    </div>
  );
};

export default SocialLogin;
