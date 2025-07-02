"use client";
import clsx from "clsx";
import React from "react";

type DashPageTitleProps = {
  className?: string;
  children: React.ReactNode;
};

const DashPageTitle = ({ children, className }: DashPageTitleProps) => {
  return (
    <h2 className={clsx("md:text-2xl text-lg font-bold mb-4", className)}>
      {children}
    </h2>
  );
};

export default DashPageTitle;
