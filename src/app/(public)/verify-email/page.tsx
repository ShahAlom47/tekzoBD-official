"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { verifyEmail } from "@/lib/allApiRequest/authRequest/authRequest";

const VerifyEmailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token"); // token from query
  const userEmail = searchParams.get("userEmail"); // userEmail from query

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoginButton, setShowLoginButton] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (!token || !userEmail) {
      setStatus("✅ Registration successful! Please check your email to verify your account.");
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      setLoading(true);
      try {
        const res = await verifyEmail({ token, userEmail });
        if (res.success) {
          setStatus("Email verified successfully! Please login now.");
          setVerified(true); // user verified
          setShowLoginButton(true);
        } else {
          setStatus("❌ Token invalid or expired. Please request a new verification email.");
        }
      } catch (err) {
        console.error(err);
        setStatus("⚠ Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, userEmail]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      {loading && <Loading />}

      <h1 className="text-black text-xl md:text-2xl lg:text-3xl font-semibold my-5 underline">
        Email Verification
      </h1>

      <div className="flex flex-col items-center mt-4">
        {verified && (
          <div className="text-green-700 text-9xl mb-4 animate-bounce">✔</div>
        )}
        <p className="text-center text-gray-700 text-lg md:text-xl">{status}</p>

        {showLoginButton && (
          <button
            onClick={() => router.push("/login")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
          >
            Login Now
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
