"use client";
import useScreenInfo from "@/hooks/useScreenInfo";
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileNavBar from "./MobileNavbar";
import AuthMenu from "./AuthMenu";
import AuthButton from "./AuthButton";
import GlobalSearchBox from "./GlobalSearchBox";
import NavCart from "./NavCart";
const Navbar = () => {
  const { scrollY, scrollDirection } = useScreenInfo();
  const showNavbar = scrollDirection === "up" || scrollY < 100;
  const showShadow = scrollY > 50;

  return (
    <nav
      className={`fixed top-0 left-0 w-full  z-50  duration-500 transition-all  backdrop-blur-sm bg-white   ${
        !showShadow
          ? "   shadow-lg shadow-backdrop"
          : "shadow-none  "
      } `}
    >
      <div
        className={`bg-gray-300  text-sm  duration-500 transition-all overflow-hidden
          ${showNavbar ? " px-4 py-1 " : "  px-4 p-0"} `}
        style={{
          maxHeight: showNavbar ? "200px  " : "0px",
        }}
      >
        <div className="max-w flex justify-between items-center gap-3">
          <div className=" flex-center gap-3 ">
            <h1 className=" text-brandNeutral">Welcome to TekzoBD</h1>
            <h1 className="text-blackDeep">Contact: 01747291486</h1>
          </div>
      <div className="md:block hidden">    <AuthButton></AuthButton></div>
        </div>
      </div>
      <div className=" lg:flex md:flex hidden items-center justify-between  max-w  ">
        <div className=" flex items-center gap-4  ">
          <Logo></Logo>
        </div>
        <div className="flex-1 ">
          <GlobalSearchBox></GlobalSearchBox>
        </div>
        <div className="flex items-center justify-center gap-4   px-2 ">
          <NavCart></NavCart>
          <AuthMenu />
        </div>
      </div>
      <div
        className={` text-sm  duration-500 transition-all overflow-hidden max-w md:flex hidden gap-4
          ${showNavbar ? " px-4 py-1 " : "  px-4 p-0"} `}
        style={{
          maxHeight: showNavbar ? "200px  " : "0px",
        }}
      >
        <NavLinks></NavLinks>
      </div>
      <div className={`lg:hidden md:hidden flex items-center justify-between `}>
        <MobileNavBar></MobileNavBar>
      </div>
    </nav>
  );
};

export default Navbar;
