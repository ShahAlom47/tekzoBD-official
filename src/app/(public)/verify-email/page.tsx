"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token from query

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("✅ Registration successful!  Please check your email to verify your account.");
      return;
    }

    const verifyToken = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("🎉 Email verified successfully! Redirecting to dashboard...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
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
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading && <Loading></Loading>}
      <h1 className="text-black text-lg md:text-xl lg:text-3xl my-5 underline">Email Verification</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmailPage;
