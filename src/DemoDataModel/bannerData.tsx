// @/data/bannerData.ts
import img1 from "@/assets/banner/bannner1.png"
import img2 from "@/assets/banner/banner2.png"
export const bannerData = [
  {
    _id: "2",
    title: "Introducing Tekzo Smart Watch",
    subtitle: "Stay connected, stay stylish.",
    link: "/products/smart-watch",
    image:img2, // public folder image
    bg: "", // optional background image
    isActive:true,
    order:2
  },
  {
    _id: "3",
    title: "Power Up with Tekzo Chargers",
    subtitle: "Fast. Safe. Reliable.",
    link: "/products/charger",
    image: img1,
    bg: "", // fallback to gradient
    isActive:true,
    order:1
  },
];

export const getBannerData=()=>{
    return bannerData
}