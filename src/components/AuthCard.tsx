import React, { useRef, useEffect } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import "../style/authpage.css";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  hovered: boolean;
  setHovered: (value: boolean) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  children,
  hovered,
  setHovered,
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setHovered]);

  const getIcon = () => {
    if (title.toLowerCase() === "login") {
      return <MdLogin />;
    }
    return <FaRegIdCard />;
  };

  return (
    <div
      className={`box px-6 relative flex flex-col items-center justify-center w-[450px] rounded-[20px] text-white font-sans transition-all duration-500 ease-in-out transform ${
        hovered ? "scale-105 py-6" : "scale-95 py-1"
      }`}
      onMouseEnter={() => setHovered(true)}
    >
      <div className="w-full">
        <h2 className="text-center text-xl font-medium relative top-7 mb-2 z-20 uppercase primaryText flex gap-2 justify-center items-center w-full">
          <span className="text-[#ff014] title-icon">{getIcon()}</span> {title}
        </h2>

        <div
          ref={formRef}
          className={`form relative transition-all duration-1000 ease-in-out overflow-hidden py-4 ${
            hovered
              ? "max-h-[1000px] opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
          style={{ transitionProperty: "opacity, transform, max-height" }}
        >
          {children}
        </div>

        <p
          className={`text-center text-gray-400 transition-opacity duration-300 ${
            hovered ? "opacity-30 h-0" : "opacity-100 animate-pulse"
          }`}
        >
          Hover to {title.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
