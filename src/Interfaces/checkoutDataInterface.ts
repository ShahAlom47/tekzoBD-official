import { ObjectId } from "mongodb";

export interface CheckoutProductItem {
  productId: string|ObjectId;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  discountedPrice: number;
}

export interface CouponData {
  code: string;
  discountPercent: number;
  discountAmount: number;
}

export interface PricingSummary {
  subtotal: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  couponDiscountAmount: number;
  grandTotal: number;
  totalQuantity: number;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  zipCode?: string;
  phone: string;
  deliveryMethod: "home-delivery" | "standard" | "express" | "pickup";
}

export interface PaymentInfo {
  method: "card" | "cash-on-delivery" | "bkash" | "nagad";
  paymentStatus: "unpaid" | "paid";
  transactionId?: string;
}

export interface CheckoutMeta {
  checkoutAt: string; // ISO timestamp
  userEmail: string;
  userId:string|ObjectId; // optional, can be null for guest checkout
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
}

// main Type  for checkout data
export interface CheckoutDataType {
  cartProducts: CheckoutProductItem[];
  coupon: CouponData | null;
  pricing: PricingSummary;
  shippingInfo?: ShippingInfo; // optional for now
  paymentInfo?: PaymentInfo;   // optional for now
  meta: CheckoutMeta;
}
export interface CheckoutRequestBody {
  cartItems: CheckoutProductItem[];
  coupon?: CouponData; // optional
  shippingInfo?: ShippingInfo; // optional
  paymentInfo?: PaymentInfo; // optional
}