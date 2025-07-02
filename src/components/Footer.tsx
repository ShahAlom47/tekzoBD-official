"use client";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

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
        <div className="flex gap-4 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs mt-6 text-gray-500">
        © {new Date().getFullYear()} TekzoBD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
