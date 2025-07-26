"use client";
import React from "react";
import clsx from "clsx";

interface HomeSecHeadingProps {
  children: React.ReactNode;
  subTitle?: string;
  className?: string;
  align?: "left" | "center";
}

const HomeSecHeading: React.FC<HomeSecHeadingProps> = ({
  children,
  subTitle,
  className = "",
  align = "center",
}) => {
  const isCentered = align === "center";

  return (
    <div
      className={clsx(
        "mb-8",
        isCentered ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        className={clsx(
          "text-2xl md:text-3xl font-bold text-gray-800",
          isCentered ? "mx-auto" : ""
        )}
      >
        {children}
      </h2>

      {subTitle && (
        <p
          className={clsx(
            "mt-2 text-sm md:text-base text-gray-500 max-w-xl",
            isCentered ? "mx-auto" : ""
          )}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default HomeSecHeading;
