"use client";
import React from "react";
import clsx from "clsx";

interface HomeSecHeadingProps {
  children: React.ReactNode;
  subTitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const HomeSecHeading: React.FC<HomeSecHeadingProps> = ({
  children,
  subTitle,
  className = "",
  align = "center",
}) => {
  const isCentered = align === "left";

  return (
    <div
      className={clsx(
        "mb-5  animated-bottom-border   w-full  py-3 ",
        isCentered ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        className={clsx(
          "text-xl md:text-2xl font-bold text-brandNeutral",
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
