"use client";
import Image from "next/image";
import dashLogo from "@/assets/logo/dasLogo.png";
import { TiMessages } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import DashSearchBox from "./DashSearchBox";

interface PropsType {
  navListOpen?: boolean;
  setNavListOpen?: (open: boolean) => void;
}

const DashHeading = ({ navListOpen, setNavListOpen }: PropsType) => {
  return (
    <div className=" flex gap-4 justify-between items-center  text-white p-4 h-full">
      <div className=" flex justify-center items-center md:gap-2 ">
        <Image
          className="rounded-full"
          src={dashLogo}
          alt="Logo"
          width={30}
          height={30}
        ></Image>
        <h1
          className={`text-grayLight font-semibold text-xl uppercase whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
    ${navListOpen ? "md:max-w-[200px] max-w-0 opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}
  `}
        >
          Dashboard
        </h1>
      </div>
      <div className="flex-1 border  flex gap-3 items-center">
        <button
          className="text-2xl text-grayLight hover:text-white transition-all duration-300 primary-hover p-1"
          onClick={() => setNavListOpen && setNavListOpen(!navListOpen)}
        >
          {navListOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <div className="w-full">
          <DashSearchBox></DashSearchBox>

        </div>
      </div>
      <div className="flex items-center gap-4 text-xl">
        <button className=" hover:scale-105">
          <TiMessages />
        </button>
        <button className=" hover:scale-105">
          <IoIosNotificationsOutline />
        </button>
      </div>
    </div>
  );
};

export default DashHeading;
