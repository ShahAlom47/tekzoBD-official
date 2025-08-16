import { getBannerData } from "@/DemoDataModel/bannerData";
import BannerSlide from "./HomeComponents/BannerSlide";
import { BannerType } from "@/Interfaces/bannerInterfaces";
import ClientOnly from "./wrappers/ClientOnly";
import bg from "@/assets/banner/fBanner2.png"
import BannerImageSlider from "./HomeComponents/BannerImageSlider";

const Banner = async () => {
  let bannerData: BannerType[] = [];

  try {
    bannerData = await getBannerData();
  } catch (error) {
    console.error("Failed to fetch banner data:", error);

    // fallback data if fetch fails
    // fallback data if fetch fails
    bannerData = [
      {
        _id: "99",
        title: "Welcome to TekzoBD",
        subtitle: "Discover the best gadgets, all in one place.",
        link: "/shop",
        image: "/assets/banner/defaultBanner.png", 
        bg: bg,
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  // Filter only active banners
  const activeBanners = bannerData.filter((banner) => banner.isActive);

  // Sort banners by order ascending
  const sortedBanners = activeBanners.sort((a, b) => a.order - b.order);

  // যদি কোনো banner না থাকে, null রিটার্ন করো
  if (sortedBanners.length === 0) return null;

  return (
    <ClientOnly>
      {/* <BannerSlide bannerData={sortedBanners} /> */}
      <BannerImageSlider bannerData={sortedBanners}></BannerImageSlider>
    </ClientOnly>
  );
};

export default Banner;
