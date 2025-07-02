// components/SafeImage.tsx

import Image, { ImageProps } from "next/image";
import React from "react";
import defaultImage from "@/assets/image/default-image.jpg"

type Props = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fallback?: string;
  className?: string;
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "className">;


const SafeImage: React.FC<Props> = ({
  src,
  alt,
  width,
  height,
  fallback = defaultImage,
  className,
  ...rest
}) => {
  // Ensure src is a non-empty string; fallback otherwise
  const validSrc = typeof src === "string" && src.trim() !== "" ? src : fallback;

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
      // Optional: add loading="lazy" for performance optimization
      loading="lazy"
      // Optional: prioritize can be added if you want this image to load fast
      // priority={true}
    />
  );
};

export default SafeImage;
