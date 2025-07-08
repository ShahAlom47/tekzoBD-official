"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use any icon you prefer

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

  const createPageLink = (page: number) => `${basePath}?page=${page}`;

  return (
    <div className="flex justify-center mt-8 gap-3 flex-wrap items-center">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={createPageLink(currentPage - 1)} className="btn-bordered rounded-sm py-2 px-2">
          <ChevronLeft size={16} />
        </Link>
      )}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        return (
          <Link
            key={pageNum}
            href={createPageLink(pageNum)}
            className={`btn-bordered rounded-sm py-1 px-3 ${
              pageNum === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={createPageLink(currentPage + 1)} className="btn-bordered rounded-sm py-2 px-2">
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
