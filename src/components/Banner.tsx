"use client";

import Loading from "@/app/loading";
import BannerImageSlider from "./HomeComponents/BannerImageSlider";
import { bannerData as defaultBannerData } from "@/DataModel/bannerData"; // import default data

const Banner: React.FC = () => {
  // Props er moto local data use
  const activeBanners = defaultBannerData.filter((banner) => banner.isActive);
  const sortedBanners = activeBanners.sort((a, b) => a.order - b.order);

  if (sortedBanners.length === 0) return <Loading />;

  return <BannerImageSlider bannerData={sortedBanners} />;
};

export default Banner;
