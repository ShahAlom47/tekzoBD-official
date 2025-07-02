"use client";

import React from "react";
import { Project } from "@/Interfaces/portfolioInterfaces";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import MediaGallery from "./MediaGallery ";
import MoreProjects from "./MoreProject";

interface Props {
  portfolio: Project;
}

const PortfolioDetailContent = ({ portfolio }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Media Slider */}
        <div className="w-full h-auto rounded overflow-hidden mb-6">
          <MediaGallery media={portfolio?.media || []}></MediaGallery>
        </div>

        {/* Title + Description */}
        <h1 className="text-3xl font-bold mb-3 text-primaryRed">
          {portfolio.title}
        </h1>
        <p className="text-gray-300 mb-6">{portfolio.description}</p>

        {portfolio.content && (
          <div
            className="prose prose-invert max-w-none text-gray-200"
            dangerouslySetInnerHTML={{ __html: portfolio.content }}
          ></div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-6">
          {portfolio.liveLink && (
            <Link
              href={portfolio.liveLink}
              target="_blank"
              className="px-4 py-2 bg-primaryRed text-white rounded shadow hover:scale-105 transition"
            >
              Live Site
            </Link>
          )}
          {portfolio.repoLink && (
            <Link
              href={portfolio.repoLink}
              target="_blank"
              className="px-4 py-2 border border-gray-500 text-gray-200 rounded hover:border-white hover:text-white transition"
            >
              View Code
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolio.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {tech.label}
              </span>
            ))}
          </div>
        </div>

        {(portfolio.tags?.length ?? 0) > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-gray-600 text-gray-400 rounded-full text-sm"
                >
                  #{tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>
            Created At: {new Date(portfolio.createdAt).toLocaleDateString()}
          </p>
          <p>
            Updated At: {new Date(portfolio.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <MoreProjects></MoreProjects>
      </aside>
    </div>
  );
};

export default PortfolioDetailContent;
