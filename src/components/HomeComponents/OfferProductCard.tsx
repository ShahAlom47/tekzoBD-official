"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import React from "react";
import SafeImage from "../SafeImage";
import { useProductPriceManage } from "@/hooks/usePriceMange";

type OfferProductCardProps = {
  product: ProductType;
};

const OfferProductCard = ({ product }: OfferProductCardProps) => {
  const {
    originalPrice,
    hasDiscount,
    discountedPrice,
    isOutOfStock,
  } = useProductPriceManage({
    price: product.price,
    discount: product.discount,
    offer: product.offer,
    stock: product.stock,
  });

  return (
    <div className="relative group rounded-sm bg-white/80 border border-gray-200 hover:border-brandPrimary shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden backdrop-blur-sm">
      
      {/* 🏷️ Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10 shadow">
          {product.discount}% OFF
        </div>
      )}

      {/* ❌ Out of stock badge */}
      {isOutOfStock && (
        <div className="absolute top-3 left-3  text-white text-xs px-2 py-1 rounded z-10 shadow">
          Stock Out
        </div>
      )}

      {/* 📸 Product Image */}
      <div className="w-full aspect-[4/3] bg-gray-50 p-3 overflow-hidden rounded-t-2xl flex items-center justify-center">
        <SafeImage
          src={product.media[0]?.url || "/placeholder.png"}
          alt={product.title}
          width={300}
          height={300}
          className="max-h-[180px] rounded-sm object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 📝 Product Info */}
      <div className="p-4 text-center space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-brandPrimary transition">
          {product.title}
        </h3>

        {/* 💸 Price */}
        <div className="flex justify-center gap-2 items-center">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              TK {originalPrice}
            </span>
          )}
          <span className="text-brandPrimary font-bold text-base">
            TK {discountedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OfferProductCard;
