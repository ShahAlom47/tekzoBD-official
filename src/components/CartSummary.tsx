"use client";
import React, { useState } from "react";
import { ProductType } from "@/Interfaces/productInterfaces";
import { CartItem } from "@/Interfaces/cartInterface";
import { useCartSummary } from "@/hooks/useCartSummary";
import CouponChecker from "./CouponChecker";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface CartSummaryProps {
  cartItems: CartItem[];
  products: ProductType[];
  couponDiscountPercent?: number;
}

const CartSummary = ({ cartItems, products }: CartSummaryProps) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>(null);

  const {
    subtotal,
    totalDiscount,
    totalAfterDiscount,
    couponDiscountAmount,
    grandTotal,
    totalQuantity,
  } = useCartSummary(cartItems, products, coupon?.discountPercent || 0);

  return (
    <div className=" relative p-4  border-t mt-4 bg-white rounded shadow-sm text-black w-full  border border-brandPrimary ">
      <button onClick={()=>setShowSummary(!showSummary)} className="absolute top-0 left-1/2 btn-base rounded-none p-0 mt-0 h-4 px-4 rounded-b-lg mb-auto flex items-start text-white">
       {showSummary? <BiSolidDownArrow />:<BiSolidUpArrow />}
      </button>
      <div className=" font-semibold">
        <CouponChecker onCouponValidated={(data) => setCoupon(data)} />
        <p>Total Items: {totalQuantity}</p>
        <p>Subtotal: TK {subtotal.toLocaleString()}</p>
        <p>Discount: TK {totalDiscount.toLocaleString()}</p>
        <p>After Discount: TK {totalAfterDiscount.toLocaleString()}</p>

        {coupon && (
          <>
            <p>
              Coupon <span className="font-semibold">{coupon.code}</span>{" "}
              Applied
            </p>
            <p>
              Coupon Discount ({coupon.discountPercent}%): TK{" "}
              {couponDiscountAmount.toLocaleString()}
            </p>
          </>
        )}
      </div>
      {/* begin: cart summary */}
      <div className="mt-3 flex justify-between items-center  gap-2 border-t-2 border-brandPrimary">
        <p className="font-semibold text-lg ">
          Grand Total: TK {grandTotal.toLocaleString()}
        </p>

        <button className=" btn-base">Checkout</button>
      </div>
    </div>
  );
};

export default CartSummary;
