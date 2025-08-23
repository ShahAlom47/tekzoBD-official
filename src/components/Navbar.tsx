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
import NavWishList from "./NavWishList";
import SocialButtons from "./SocialButton";
import { useUser } from "@/hooks/useUser";
import Notification from "./Notification";
import Link from "next/link";
const Navbar = () => {
  const {user}= useUser()
  const { scrollY, scrollDirection } = useScreenInfo();
  const showNavbar = scrollDirection === "up" || scrollY < 100;
  const showShadow = scrollY > 50;
  console.log("Current User:", user);
  return (
    <nav
      className={`fixed top-0 left-0 w-full  z-50  duration-500 transition-all  backdrop-blur-sm bg-white   ${
        !showShadow
          ? "   shadow-lg shadow-backdrop"
          : "shadow-none  "
      } `}
    >

      
      <div
        className={`bg-gray-100  text-sm  duration-500 transition-all overflow-hidden
          ${showNavbar ? " px-4 py-1 " : "  px-4 p-0"} `}
        style={{
          maxHeight: showNavbar ? "200px  " : "0px",
        }}
      >

        <div className="max-w flex justify-between items-center gap-3">
          <div className=" flex-center  flex-1  gap-3 px-3">
            <h1 className=" text-brandNeutral">Welcome to TekzoBD</h1>
            <h1 className="text-blackDeep hidden md:inline">Contact: 01747291486</h1>
            <SocialButtons className="text-xs"></SocialButtons>
          </div>
      <div className="md:block hidden">    <AuthButton></AuthButton></div>
        </div>
      </div>
      <div className=" lg:flex md:flex hidden items-center justify-between  max-w  ">
        <div className=" flex items-center gap-4  ">
          <Logo></Logo>
          <Link className="bb text-black" href={`verify-email?token=${111}`} >verify Page</Link>
        </div>
        <div className="flex-1 ">
          <GlobalSearchBox></GlobalSearchBox>
        </div>
        <div className="flex items-center justify-center gap-4   px-2 ">
         
          {user?.role==="admin"?
          (<Notification></Notification>):
          ( <NavWishList></NavWishList>)
          }
          
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
