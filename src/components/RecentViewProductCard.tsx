"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/Interfaces/productInterfaces";
import SafeImage from "./SafeImage";

interface Props {
  product: ProductType;
}

const RecentViewProductCard: React.FC<Props> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${product.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white flex rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg border hover:border-brandPrimary p-1 transition duration-300 group"
    >
      <div className="relative max-h-20 w-1/2 bg-gray-100  rounded-md h-fit my-auto min-h-11">
        <SafeImage
          src={product.media[0]?.url}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
       
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        <div className="text-gray-600 text-xs">
          ৳ {product.price}
          {product.discount > 0 && (
            <span className="ml-2 text-red-500 line-through text-xs">
              ৳ {product.price + product.discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentViewProductCard;
