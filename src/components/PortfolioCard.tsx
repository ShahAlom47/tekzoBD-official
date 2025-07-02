"use client";
import { Project } from "@/Interfaces/portfolioInterfaces";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SafeImage from "./SafeImage";

type PortfolioDetailsProps = {
  portfolio: Project;
};

const PortfolioCard = ({ portfolio }: PortfolioDetailsProps) => {
  const images = portfolio?.media?.filter((item) => item.type === "image") || [];

  return (
    <div className="primary-hover group md:p-7 p-4 rounded-md transition-all duration-700 ease-in-out">
      {/* Image Slider */}
      <div className="relative w-full  rounded overflow-hidden ">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full md:h-52 sm:h-40 h-32 rounded-sm">
     
                <SafeImage
                  src={img.url}
                  alt={`portfolio-image-${index}`}
                  fill
                  unoptimized
                  // width={300}
                  // height={200}
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                ></SafeImage>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Title and Links */}
      <h2 className="text-xl font-semibold my-3 mt-5 capitalize transition-all duration-700 ease-in-out group-hover:text-primaryRed">
        {portfolio.title}
      </h2>
      <div className="flex justify-between items-center">
        <Link
          href={portfolio?.liveLink || ""}
          target="_blank"
          className="underline hover:text-primaryRed hover:scale-110 transition-all duration-500"
        >
          Live
        </Link>
        <Link
          href={`/portfolio/${portfolio._id}`}
          className="primary-hover px-3 py-0 capitalize transition-all duration-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PortfolioCard;
