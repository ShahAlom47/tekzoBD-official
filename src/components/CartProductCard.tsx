"use client";

import React from "react";
import { ProductType } from "@/Interfaces/productInterfaces";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface Props {
  product: ProductType;
  quantity: number;
}

const CartProductCard = ({ product, quantity }: Props) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 border rounded p-3 shadow-sm bg-white">
      {/* Image */}
      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <Image
          src={product.media[0]?.url || "/no-image.jpg"}
          alt={`${product.title} image`}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h4>
        <p className="text-sm text-gray-500 mt-1">${product.price}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(product._id.toString(), quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button
           onClick={() => updateQuantity(product._id.toString(), quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(product._id.toString())}
        className="text-red-500 hover:text-red-700 transition"
        title="Remove"
      >
        <MdClose size={22} />
      </button>
    </div>
  );
};

export default CartProductCard;
