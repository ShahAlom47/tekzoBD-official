import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: string; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  href,
}) => {
  const baseClass = clsx(
    "px-4 py-1 rounded-sm text-primaryRed font-medium uppercase",
    "bg-gradient-to-tr from-blackLight to-gray-700",
    "bg-[length:150%_100%] bg-left",
    "transition-all duration-700 ease-in-out",
    "hover:bg-gradient-to-bl hover:-translate-y-1",
    "shadow-[-1px_2px_2px_#d8d8d863]",
    "hover:shadow-[1px_-2px_2px_#d8d8d863]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {children}
    </button>
  );
};

export default PrimaryButton;
