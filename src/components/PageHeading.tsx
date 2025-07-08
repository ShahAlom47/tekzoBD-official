"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const PageHeading = ({ title, isDetailsPage }: { title?: string; isDetailsPage?: boolean }) => {
  const pathname = usePathname() || "/";
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastIndex = pathSegments.length - 1;

  const currentPage = isDetailsPage
    ? title || "Details"
    : pathSegments[lastIndex] || "Home";

  return (
    <div className=" text-grayDeep">
      <h1 className=" text-brandNeutral text-xl font-semibold capitalize">{currentPage.replace(/-/g, " ")}</h1>
      <nav>
        <Link href="/">Home</Link>
        {pathSegments.map((segment, index) =>
          lastIndex === index && isDetailsPage ? (
            <span key={index}> / {title}</span>
          ) : lastIndex === index ? (
            <span key={index}> / {segment.replace(/-/g, " ")}</span>
          ) : (
            <span key={index}>
              {" "}
              / <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>{segment.replace(/-/g, " ")}</Link>
            </span>
          )
        )}
      </nav>
    </div>
  );
};

export default PageHeading;
