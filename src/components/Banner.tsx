// app/components/Banner.tsx or wherever your Banner is
import { getBannerData } from "@/DemoDataModel/bannerData";
import BannerSlide from "./BannerSlide";
import { BannerType } from "@/Interfaces/bannerInterfaces";

const Banner = async () => {
  let bannerData: BannerType[];

  try {
    bannerData = await getBannerData();
  } catch  {
    // fallback data if fetch fails
    bannerData = [
      {
        _id: "99",
        title: "Welcome to Tekzo",
        subtitle: "Your gadget zone.",
        link: "/products",
        image: "../assets/banner/defultBanner.png",
        bg: "", 
        order: 1,
        isActive:true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  // filter unpublished banners (optional safety)
  const filteredBanners = bannerData.filter((banner) => banner.isActive);

  // sort by priority (optional)
  const sortedBanners = filteredBanners.sort((a, b) => a.order - b.order);

  return <BannerSlide bannerData={sortedBanners} />;
};

export default Banner;
