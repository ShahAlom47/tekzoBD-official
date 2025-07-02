"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";
import defaultUserImage from "../assets/image/defaultUserWhite.webp";

const AuthMenu: React.FC = () => {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <span className="animate-spin"><FaSpinner /></span>;
  }

  if (!sessionData?.user) {
    return (null
    );
  }

  const { name, image, role } = sessionData.user as {
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn-circle avatar hover:scale-95 border-brandPrimary border">
        <div className="w-8  rounded-full  border p-0.5 border-blackDee">
          <Image
            src={image || defaultUserImage}
            alt="User Avatar"
            width={15}
            height={15}
            className="rounded-full"
          />
        </div>
      </div>

      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className="font-semibold text-sm text-gray-500 px-2 py-1 uppercase">
          {name || "User"}
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>

        {/* Only show if user is admin */}
        {role === "admin" && (
          <li>
            <Link href="/dashboard" className="text-red-600 font-semibold">Dashboard</Link>
          </li>
        )}

        <li>
          <button onClick={() => signOut()} className="text-left w-full">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default AuthMenu;
