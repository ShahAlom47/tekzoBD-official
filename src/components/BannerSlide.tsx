"use client";

import { BannerType } from "@/Interfaces/bannerInterfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { StaticImageData } from "next/image";

type SlidePropsType = {
  bannerData: BannerType[];
};

const BannerSlide = ({ bannerData }: SlidePropsType) => {
  return (
    <div
      className="w-full"
      style={{
        backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {bannerData?.map((banner) => (
          <SwiperSlide key={String(banner._id)}>
            <div
              className="w-full min-h-[70vh] sm:min-h-[60vh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 py-6 transition-all duration-500"
              style={{
                backgroundImage: banner.bg
                  ? `url(${banner.bg})`
                  : "linear-gradient(to right, #1e3a8a, #3b82f6)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-screen-xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 min-h-[60vh] sm:min-h-[55vh] md:min-h-[70vh]">
                {/* Left: Text Content */}
                <div className="text-white space-y-4 order-2 md:order-1 animate-fadeInUp">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug">
                    {banner.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.link}
                    className="btn-bordered border-white text-white px-4 py-2 inline-block rounded-sm hover:bg-gray-200 hover:text-black transition duration-300"
                  >
                    View Product
                  </Link>
                </div>

                {/* Right: Image */}
                <div className="flex justify-center order-1 md:order-2">
                  <SafeImage
                    src={banner?.image as string | StaticImageData}
                    alt={banner.title}
                    width={400}
                    height={400}
                    className="object-contain w-auto max-h-[180px] sm:max-h-[250px] md:max-h-[400px]"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlide;
