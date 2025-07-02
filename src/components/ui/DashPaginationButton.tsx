import React from "react";

type DashPaginationButtonProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const DashPaginationButton: React.FC<DashPaginationButtonProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const handlePrev = () => {
    if (!isFirst) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLast) onPageChange(currentPage + 1);
  };

  return (
    <div
      className={`flex items-center justify-center my-2 space-x-2 ${className}`}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={handlePrev}
        disabled={isFirst}
        className={`primary-hover 
          ${
            isFirst
              ? "cursor-not-allowed "
              : ""
          }`}
      >
        Previous
      </button>

      <span className="px-3 py-2 text-gray-700 font-medium select-none">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={isLast}
        className={` 
          ${
            isLast
              ? "cursor-not-allowed primary-hover"
              : "primary-hover"
          }`}
      >
        Next
      </button>
    </div>
  );
};
