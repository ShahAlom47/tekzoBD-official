"use client";

import React, { useState } from "react";
import SafeImage from "./SafeImage";
import SafeVideo from "./SafeVideo";
import { MediaItem } from "@/Interfaces/portfolioInterfaces";
import { CgPlayButton } from "react-icons/cg";

interface MediaGalleryProps {
  media: MediaItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
  const [activeMedia, setActiveMedia] = useState<MediaItem>(media[0]);

  return (
    <div className="space-y-6">
      {/* Large Preview Area */}
      <div className="w-full aspect-video   rounded overflow-hidden shadow-lg">
        {activeMedia.type === "image" ? (
          <SafeImage
            src={activeMedia.url}
            alt="active-media"
            width={300}
            height={200}
            className=" w-full object-cover rounded"
          />
        ) : (
          <SafeVideo
            url={activeMedia.url}
            className="w-full h-full object-cover rounded"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 overflow-x-auto">
        {media.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveMedia(item)}
            className={`relative group cursor-pointer overflow-hidden rounded border-2 transition-all duration-300 ${
              item.url === activeMedia.url
                ? "border-primaryRed scale-105"
                : "border-transparent hover:border-white"
            } min-w-[80px] sm:min-w-[120px] aspect-video`}
          >
            {item.type === "image" ? (
              <SafeImage
                src={item.url}
                alt={`thumb-${index}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full relative">
             
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
                  <CgPlayButton className="text-white text-4xl" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
