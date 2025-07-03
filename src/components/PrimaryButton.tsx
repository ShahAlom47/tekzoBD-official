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
    "px-4 py-1 rounded-full font-medium ",
    "transition-all duration-300 ease-in-out",
    " border border-brandPrimary text-brandNeutral",
    "hover:bg-brandPrimary hover:text-white",
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
