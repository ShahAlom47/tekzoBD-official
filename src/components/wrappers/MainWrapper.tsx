"use client";

import { useAdminFirebaseToken } from "@/hooks/useAdminFirebaseToken";
import { useCategories } from "@/hooks/useCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { useWishlist } from "@/hooks/useWishlist";
import { usePathname } from "next/navigation";
import React from "react";

const HIDE_MARGIN_ROUTES = ["/dashboard",];

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
    useCategories();  // first time data load in the redux store 
    useWishlist()
    useAdminFirebaseToken()  //  for  Firebase  notification DB Token Manage
      const { ConfirmModal } = useConfirm();

  

  const hasMargin = !HIDE_MARGIN_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <main className={`${hasMargin ? "md:pt-[8%] pt-[13%]" : "pt-0"} min-h-screen `}>
      {children}
      {ConfirmModal}
    </main>
  );
}
