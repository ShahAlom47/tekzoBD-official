"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaFolderOpen, FaPlus, FaBlog } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbLayoutGridAdd } from "react-icons/tb";

interface PropsType {
  isOpen: boolean;
}

const DashNavbar: React.FC<PropsType> = ({ isOpen }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "OverView", href: "/dashboard", icon: FaHome },
    { name: "Products", href: "/dashboard/manageProducts", icon: AiFillProduct },
    { name: " Add Products", href: "/dashboard/manageProducts/addProducts", icon: TbLayoutGridAdd  },
    { name: "Portfolio", href: "/dashboard/managePortfolio", icon: FaFolderOpen },
    { name: "Add Portfolio", href: "/dashboard/addPortfolio", icon: FaPlus },
    { name: "Blogs", href: "/blogs", icon: FaBlog },
    { name: "Add Blog", href: "/add-blog", icon: FaPlus },
  ];

  return (
    <div className="flex flex-col group gap-2 text-black">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={index}
            href={item.href}
            className={`  flex items-center gap-2 md:p-2 p-1  rounded-full transition-all duration-300 ease-in-out overflow-hidden ${
              isActive ? "bg-white" : "hover:bg-white"
            } ${isOpen ? "w-40 " : " md:w-[34px] w-0 group-hover:w-48"}`}
          >
            {Icon && <Icon className="text-lg flex-shrink-0" />}
            <span
              className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out
              ${
                isOpen
                  ? "opacity-100 ml-2"
                  : "opacity-0 ml-0 group-hover:opacity-100 group-hover:ml-2"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default DashNavbar;
