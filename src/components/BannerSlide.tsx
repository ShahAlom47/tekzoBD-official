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
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
          style={{
                backgroundImage:"linear-gradient(to right, #1e3a8a, #3b82f6)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
      >
        {bannerData?.map((banner) => (
          <SwiperSlide key={String(banner._id)}>
            <div
              className="w-full min-h-[400px] md:min-h-[500px] transition-all duration-500"
              style={{
                backgroundImage: banner.bg
                  ? `url(${banner.bg})`
                  : "linear-gradient(to right, #1e3a8a, #3b82f6)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full max-w h-full flex justify-center items-center px-6 py-8 ">
                <div className="max-w-screen-xl w-full grid grid-cols-1  md:grid-cols-2 gap-8 items-center p-4">
                  {/* Left Content */}
                  <div className="text-white space-y-4 md:order-1 order-2  animate-fadeInUp  ">
                    <h1 className="text-2xl md:text-4xl font-bold ">
                      {banner.title}
                    </h1>
                    <p className="">{banner.subtitle}</p>
                    <Link
                      href={banner.link}
                      className="inline-block px-5 py-1 bg-white text-brandPrimary font-semibold rounded-sm hover:bg-gray-200 transition"
                    >
                      View Product
                    </Link>
                  </div>

                  {/* Right Image */}
                  <div className="flex justify-center md:order-2 order-1">
                    <SafeImage
                      src={banner?.image as string | StaticImageData}
                      alt={banner.title}
                      width={400}
                      height={400}
                      className="object-contain"
                    ></SafeImage>
                  </div>
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
