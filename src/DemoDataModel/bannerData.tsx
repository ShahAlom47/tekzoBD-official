// @/data/bannerData.ts
import img1 from "@/assets/banner/bannner1.png";
import img2 from "@/assets/banner/banner2.png";
import img3 from "@/assets/banner/banner3.png";
import img4 from "@/assets/banner/defultBanner.png";

export const bannerData = [
  {
    _id: "2",
    title: "Introducing Tekzo Smart Watch",
    subtitle: "Stay connected with elegance and innovation.",
    link: "/products/smart-watch",
    image: img2,
    bg: "",
    isActive: true,
    order: 2,
  },
  {
    _id: "3",
    title: "Power Up with Tekzo Chargers",
    subtitle: "Fast charging made safe and reliable.",
    link: "/products/charger",
    image: img1,
    bg: "",
    isActive: true,
    order: 1,
  },
  {
    _id: "4",
    title: "Experience the Power of Sound",
    subtitle: "Wireless headphones designed for comfort and clarity.",
    link: "/products",
    image: img3,
    bg: "",
    isActive: true,
    order: 1,
  },
  {
    _id: "5",
    title: "Welcome to Tekzo",
    subtitle: "Discover the latest gadgets, all in one place.",
    link: "/products",
    image: img4,
    bg: "",
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getBannerData = () => {
  return bannerData;
};
