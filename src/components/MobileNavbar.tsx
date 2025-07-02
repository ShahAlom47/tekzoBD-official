"use client";
import React, { useState } from "react";
import { CgMenuHotdog } from "react-icons/cg";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Drawer from "./Drawer";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full px-4 py-0 bg-[var(--custom-bg)] text-[var(--custom-title)]">
      <Logo />
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer p-2 rounded hover:bg-[var(--custom-card-hover)]"
      >
        <CgMenuHotdog size={26} />
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[50%]"
        className="rounded-l-lg "
      >
      <div className="flex flex-col gap-2 p-2">
        <div className="py-4 w-full border-b-2 border-grayLight mb-3 flex gap-2">
          

        </div>
          <NavLinks />
      </div>
      </Drawer>
    </div>
  );
};

export default MobileNavBar;
