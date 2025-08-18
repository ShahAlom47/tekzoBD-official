"use client";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const SocialLogin: React.FC = () => {
  const handleSocialLogin = async (provider: string) => {
    try {
      const res = await signIn(provider, { redirect: false });
      if (res?.error) {
        toast.error("Login failed. Please try again.");
        console.error("Social login error:", res.error);
      } else {
        toast.success("Logged in successfully!");
        // যদি তুমি চান redirect করতে
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Social login exception:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <button
          className="btn-bordered rounded-full w-10 h-10 p-1 text-blue-600 hover:bg-blue-50 transition"
          onClick={() => handleSocialLogin("facebook")}
        >
          <FaFacebookF className="text-2xl" />
        </button>
        <button
          className="btn-bordered rounded-full w-10 h-10 p-1 text-red-600 hover:bg-red-50 transition"
          onClick={() => handleSocialLogin("google")}
        >
          <FaGoogle className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
