"use client";
import React, { useState } from "react";
import { CgMenuHotdog } from "react-icons/cg";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Drawer from "./Drawer";
import NavCart from "./NavCart";
import AuthButton from "./AuthButton";
import AuthMenu from "./AuthMenu";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-4 py-0 bg-[var(--custom-bg)] text-[var(--custom-title)]">
      <Logo />
      <div className=" flex items-center  gap-2">
      
        <NavCart></NavCart>
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer text-blackDeep"
        >
          <CgMenuHotdog size={30} />
        </button>
      </div>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[60%]"
        className="rounded-l-lg  "
      >
        <div className=" gap-2 p-2 flex justify-between flex-col items-center   min-h-[95vh]">
          <div className=" flex gap-1 items-center">
            <Logo></Logo>
            <AuthMenu></AuthMenu>
          </div>

          <div className="flex flex-col items-start justify-start w-full flex-1">
            <NavLinks />
          </div>
          <div className=" border-t-2 w-full">
            <AuthButton></AuthButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavBar;
