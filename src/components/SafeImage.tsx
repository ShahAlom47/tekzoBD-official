// components/SafeImage.tsx

import Image, { ImageProps, StaticImageData } from "next/image";
import React from "react";
import defaultImage from "@/assets/image/default-image.jpg";

type LocalOrRemoteSrc = string | StaticImageData | null | undefined;

type Props = {
  src?: LocalOrRemoteSrc | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fallback?: LocalOrRemoteSrc;
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
  const isValidString = (val: unknown): val is string =>
    typeof val === "string" && val.trim() !== "";

  const validSrc: string | StaticImageData =
    src && (isValidString(src) || src instanceof Object)
      ? (src as string | StaticImageData)
      : (fallback as string | StaticImageData);

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
};

export default SafeImage;
