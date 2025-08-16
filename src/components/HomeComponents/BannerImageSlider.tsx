"use client";

import { useState, useEffect } from "react";
import { BannerType } from "@/Interfaces/bannerInterfaces";
import SafeImage from "../SafeImage";
import Link from "next/link";

interface BannerImageProps {
  bannerData: BannerType[];
  slideInterval?: number;
}

const BannerImageSlider: React.FC<BannerImageProps> = ({
  bannerData,
  slideInterval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [bannerData.length, slideInterval]);

  const currentBanner = bannerData[currentIndex];

  return (
    <div className="relative w-full overflow-hidden   ">
      {/* Single Slide */}
      <SafeImage
        src={currentBanner.bg}
        alt={currentBanner.title}
        width={1920}
        height={1080}
        style={{ width: "100%", height: "auto", objectFit: "cover", transition: "opacity 1s" }}
      />

      {/* Button Overlay */}
      <Link
        href="/shop"
        className="btn-base rounded-full absolute md:bottom-5 bottom-3 left-1/2 -translate-x-1/2 z-20 transition-transform hover:scale-105 md:text-base text-xs"
      >
        See Products
      </Link>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {bannerData.map((_, idx) => (
          <span
            key={idx}
            className={`md:w-3 md:h-3 h-1 w-1 rounded-full cursor-pointer ${
              idx === currentIndex ? "bg-blue-700" : "bg-gray-300/50 border border-blue-700"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerImageSlider;
