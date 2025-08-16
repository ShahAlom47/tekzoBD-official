// @/data/bannerData.ts
import img1 from "@/assets/banner/bannner1.png";
import img2 from "@/assets/banner/banner2.png";
import img3 from "@/assets/banner/banner3.png";
import img4 from "@/assets/banner/defultBanner.png";
import bg1 from "@/assets/banner/fBanner.png";
import bg2 from "@/assets/banner/fBanner2.png";
import bg3 from "@/assets/banner/fbanner3.png";
import bg4 from "@/assets/banner/fbanner4.png";

export const bannerData = [
  {
    _id: "1",
    title: "Your One-Stop Tech Destination",
    subtitle: "Discover the latest gadgets and accessories at the best prices.",
    link: "/shop",
    image: img1,
    bg: bg1,
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Upgrade Your Lifestyle with Innovation",
    subtitle: "Stay ahead with smart devices and modern solutions.",
    link: "/shop",
    image: img2,
    bg: bg2,
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Experience Comfort and Clarity",
    subtitle: "Top-quality audio, wearables, and more for your daily needs.",
    link: "/shop",
    image: img3,
    bg: bg3,
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    title: "Welcome to Tekzo",
    subtitle: "Your trusted hub for all kinds of tech products.",
    link: "/shop",
    image: img4,
    bg: bg4,
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getBannerData = () => {
  return bannerData;
};
