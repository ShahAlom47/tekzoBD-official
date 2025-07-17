"use client";
import React, { useState } from "react";
import { ProductType } from "@/Interfaces/productInterfaces";
import { CartItem } from "@/Interfaces/cartInterface";
import { useCartSummary } from "@/hooks/useCartSummary";
import CouponChecker from "./CouponChecker";

interface CartSummaryProps {
  cartItems: CartItem[];
  products: ProductType[];
  couponDiscountPercent?: number;
}

const CartSummary = ({
  cartItems,
  products,
}: CartSummaryProps) => {
  const [coupon, setCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  const {
    subtotal,
    totalDiscount,
    totalAfterDiscount,
    couponDiscountAmount,
    grandTotal,
    totalQuantity,
  } = useCartSummary(cartItems, products, coupon?.discountPercent || 0);

  return (
    <div className="p-4 border-t mt-4 bg-white rounded shadow-sm text-black w-full">

      <CouponChecker onCouponValidated={(data) => setCoupon(data)} />

      <p>Subtotal: TK {subtotal.toLocaleString()}</p>
      <p>Discount: TK {totalDiscount.toLocaleString()}</p>
      <p>After Discount: TK {totalAfterDiscount.toLocaleString()}</p>

      {coupon && (
        <>
          <p>Coupon <span className="font-semibold">{coupon.code}</span> Applied</p>
          <p>Coupon Discount ({coupon.discountPercent}%): TK {couponDiscountAmount.toLocaleString()}</p>
        </>
      )}

      <p className="font-semibold text-lg mt-2">Grand Total: TK {grandTotal.toLocaleString()}</p>
      <p>Total Items: {totalQuantity}</p>
    </div>
  );
};

export default CartSummary;
