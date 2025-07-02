"use client";

import { usePathname } from "next/navigation";
import React from "react";

const HIDE_MARGIN_ROUTES = ["/dashboard",];

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hasMargin = !HIDE_MARGIN_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <main className={`${hasMargin ? "md:mt-[8%] mt-[15%]" : "mt-0"} min-h-screen`}>
      {children}
    </main>
  );
}
