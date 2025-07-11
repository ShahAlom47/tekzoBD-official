"use client";

import { ProductType } from "@/Interfaces/productInterfaces";
import React from "react";
import SafeImage from "./SafeImage";
import RatingDisplay from "./ui/RatingDisplay";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/hooks/useWishlist";

type ProductCardProps = {
  item: ProductType;
  layout: "list" | "grid-3" | "grid-4";
};

const ProductCard = ({ item, layout }: ProductCardProps) => {
  const router = useRouter();

  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleWishClick=(e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
     toggleWishlist(item._id.toString())


  }

  const handleCardClick = () => {
    router.push(`/shop/${item.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Added to cart:", item.title);
  };

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
      className={`
        border border-brandNeutral rounded-sm shadow hover:shadow-md transition duration-300 cursor-pointer bg-white group hover:border-brandPrimary relative overflow-hidden
        ${
          layout === "list"
            ? "flex flex-row md:flex-row items-center gap-4 p-4"
            : ""
        }
      `}
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

      {/* Wishlist Button */}

      <button
        onClick={handleWishClick}
        className="absolute top-8 right-2 z-20 group-hover:-translate-x-0 translate-x-[200%] transition-all duration-500 btn-bordered p-1 text-sm text-brandPrimary rounded-sm"
      >
        
        {isWishlisted(item._id.toString()) ?<FaHeart />: "❤️"}
      </button>

      {/* ✅ Product Image */}
      <div
        className={`
          relative bg-gray-100 overflow-hidden
          ${
            layout === "list"
              ? "w-24 md:w-48 lg:w-1/3 aspect-square"
              : "p-3 w-full aspect-square"
          }
        `}
      >
        <SafeImage
          src={item?.media[0]?.url}
          alt={item?.title}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* ✅ Product Info */}
      <div
        className={`
          ${
            layout === "list"
              ? "flex-1 md:pl-4 space-y-2 text-left w-full"
              : "p-4 space-y-2 flex flex-col justify-center items-center"
          }
        `}
      >
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
