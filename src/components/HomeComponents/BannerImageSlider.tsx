"use client";

import { useState, useEffect } from "react";
import { BannerType } from "@/Interfaces/bannerInterfaces";
import SafeImage from "../SafeImage";

interface BannerImageProps {
  bannerData: BannerType[];
  slideInterval?: number;
}

const BannerImageSlider: React.FC<BannerImageProps> = ({
  bannerData,
  slideInterval = 3000,
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
    <div className="relative w-full overflow-hidden pt-2">
      <SafeImage
        src={currentBanner.bg}
        alt={`Banner ${currentIndex + 1}`}
        width={1920} // maximum expected width
        height={1080} // placeholder height, actual height auto
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        className="block"
      />
    </div>
  );
};

export default BannerImageSlider;
