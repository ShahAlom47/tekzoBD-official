"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface PageHeadingProps {
  backgroundImage?: string;
  title?: string; // Optional prop for custom title
  isDetailsPage?: boolean; // Optional flag to check if it's a details page
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, isDetailsPage }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const lastIndex = pathSegments.length - 1;

  // If the page is a details page and a title is provided, use the custom title
  const currentPage = isDetailsPage
    ? title || "Details"
    : pathSegments[pathSegments.length - 1] || "Home";

  return (
    <div className="relative w-full h-20 flex flex-col   border-b border-brandNeutral">

      {/* Page Title */}
      <h1 className="relative text-grayDeep text-4xl font-semibold capitalize">
        {currentPage.replace("-", " ")}
      </h1>

      {/* Breadcrumb Navigation */}
      <nav className="relative text-brandNeutral text-sm mt-2 capitalize">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {pathSegments.map((segment, index) =>
          lastIndex === index && isDetailsPage ? (
            <span key={index} className="mx-1 text-brandPrimary">
              / {title}
            </span>
          ) : lastIndex === index ? (
            <span key={index} className="mx-1 text-brandPrimary ">
              / {segment.replace("-", " ")}
            </span>
          ) : (
            <span key={index} className="mx-1 capitalize">
              /{" "}
              <Link
                href={`/${segment}`}
                className="hover:underline capitalize text-brandNeutral"
              >
                {segment.replace("-", " ")}
              </Link>
            </span>
          )
        )}
      </nav>
    </div>
  );
};

export default PageHeading;
