"use client"; 

import Link from "next/link";
import img from "@/assets/image/not-found-dark.png";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${img.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-800/40"></div>

      <div className="relative z-10 text-white lg:w-6/12 w-8/12 flex flex-col items-start">
        <h1 className="lg:text-4xl md:text-3xl text-xl font-bold">
          Oops! Page Not Found
        </h1>
        <h1 className="lg:text-9xl text-7xl font-bold text-primary">404</h1>
        <p className="text-white lg:w-8/12 w-11/12">
          Thank you for visiting Portal. We apologize for any inconvenience
          caused. Happy exploring!
        </p>
        <Link href="/">
          <button className="mt-6 primary-hover text-grayLight">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
