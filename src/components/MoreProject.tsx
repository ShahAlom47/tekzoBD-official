"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/Interfaces/portfolioInterfaces";
import { getAllPortfolio } from "@/lib/allApiRequest/portfolioRequest/porfolioRequest";
import { useQuery } from "@tanstack/react-query";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MoreProjects: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const {
    data: portfolio,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getMoreProject"],
    queryFn: async () => {
      const response = await getAllPortfolio({
        currentPage: 1,
        limit: 4,
      });
      if (!response || !response.success) {
        throw new globalThis.Error(
          response.message || "Failed to fetch portfolio data"
        );
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const moreProjects = (portfolio?.data as Project[]) || [];

  if (isLoading) {
    return (
      <p className="text-gray-400 text-center py-10">Loading more projects...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center py-10">{error?.message}</p>;
  }

  if (moreProjects.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 px-2">
      <h2 className="text-xl font-bold text-grayLight mb-6 border-b border-grayMid pb-2">
        More Projects
      </h2>

      <div className="space-y-4">
        {moreProjects.map((project, index) => (
          <div
            key={project?._id?.toString()}
            className="primary-hover p-4 capitalize"
          >
            {/* Title + Arrow button row */}
            <div className="flex items-center justify-between">
              <Link
                href={`/portfolio/${project._id}`}
                className="text-white text-lg font-semibold hover:underline hover:text-primaryRed"
              >
                {project.title}
              </Link>

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="text-gray-300 hover:text-white transition text-xl"
                title="Toggle Description"
              >
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* Description toggle */}
            {openIndex === index && (
              <p className="mt-3 text-gray-400 text-sm">{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreProjects;
