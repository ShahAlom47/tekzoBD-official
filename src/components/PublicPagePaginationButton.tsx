"use client";

import Link from "next/link";

interface PublicPagePaginationButtonProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // optional base path like "/portfolio"
}

export default function PublicPagePaginationButton({
  currentPage,
  totalPages,
  basePath = "",
}: PublicPagePaginationButtonProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-3 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        return (
          <Link
            key={pageNum}
            href={`${basePath}?page=${pageNum}`}
            className={`primary-hover min-w-6  text-center transition ${
              pageNum === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 "
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
    </div>
  );
}
