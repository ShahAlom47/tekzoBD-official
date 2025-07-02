"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blackDeep text-white px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong</h1>
      <p className="text-center text-gray-400 max-w-md mb-6">
        We`re sorry, an unexpected error occurred. Please try again later or go back to the homepage.
      </p>
      <button
        onClick={handleGoHome}
        className="primary-hover"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Error;
