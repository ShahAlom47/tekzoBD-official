"use client";
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SocialButtons from "./SocialButton";

const Footer = () => {
  return (
    <footer className="bg-grayLight text-gray-300 py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo or Site Name */}
        <div className="text-2xl font-bold text-white">
          <Logo></Logo>
        </div>

        {/* Navigation Links */}
        <div className="  flex flex-row flex-wrap gap-4 justify-center text-sm">
          <NavLinks></NavLinks>
        </div>

        {/* Social Icons (external) */}
       <SocialButtons></SocialButtons>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs mt-6 text-gray-500">
        © {new Date().getFullYear()} TekzoBD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
