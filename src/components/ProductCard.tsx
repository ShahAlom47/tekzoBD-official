"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import React from "react";
import SafeImage from "./SafeImage";
import RatingDisplay from "./ui/RatingDisplay";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  item: ProductType;
};

const ProductCard = ({ item }: ProductCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${item.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Added to cart:", item.title);
  };

  // 🕒 Offer Time Validation (Frontend)
  const isOfferActive = (() => {
    const offer = item.offer;
    if (!offer?.isActive || !offer.startDate || !offer.endDate) return false;

    const now = new Date().getTime();
    const start = new Date(offer.startDate).getTime();
    const end = new Date(offer.endDate).getTime();

    return now >= start && now <= end;
  })();

  const hasDiscount = isOfferActive && item.discount > 0;
  const originalPrice = item.price;
  const discountedPrice = hasDiscount
    ? Math.round(originalPrice - (originalPrice * item.discount) / 100)
    : originalPrice;

  const isOutOfStock = item.stock === 0;

  return (
    <div
      onClick={handleCardClick}
      className="border border-brandNeutral rounded-sm overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer bg-white group hover:border-brandPrimary relative"
    >
      {/* ✅ Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {item.discount}% OFF
        </div>
      )}

      {/* ✅ Stock Out Badge */}
      {isOutOfStock && (
        <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded z-10">
          Stock Out
        </div>
      )}

      {/* ✅ Product Image */}
      <div className="relative p-4 w-full aspect-square overflow-hidden bg-gray-100">
        <SafeImage
          src={item?.media[0]?.url}
          alt={item?.title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* ✅ Product Info */}
      <div className="p-4 space-y-2 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {item?.title}
        </h2>

        {/* ✅ Price Section */}
        <div className="flex items-center space-x-2">
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              TK {originalPrice}
            </span>
          )}
          <span className="text-brandPrimary text-base font-semibold">
            TK {discountedPrice}
          </span>
        </div>

        {/* ✅ Rating */}
        <RatingDisplay avgRating={item?.ratings?.avg || 0} starSize={16} />

        {/* ✅ Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-2 btn-bordered text-sm px-4 py-1 w-full transition ${
            isOutOfStock ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
