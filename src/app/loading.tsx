"use client";

import React from "react";
import "../style/loadingSpinner.css";

const Loading = () => {
  return (
    <div className="min-h-screen w-full bg-blackLight bg-opacity-55 flex flex-col justify-center items-center text-white">
      <div className=" w-40 h-40  relative flex items-center justify-center">
        <div className="custom-loader"></div>
        <div className="custom-loader2"></div>
        <p className="text-sm font-semibold tracking-wide ">Loading...</p>
      </div>

      <div className="glow-line"></div>
    </div>
  );
};

export default Loading;
