import { CartItem } from "@/Interfaces/cartInterface";
import { ProductType } from "@/Interfaces/productInterfaces";

export const useCartSummary = (
  cartItems: CartItem[],
  products: ProductType[],
  couponDiscountPercent: number = 0
) => {

  // হুকের ভিতরে helper ফাংশনস
  const isOfferActive = (offer?: { isActive: boolean; startDate?: string; endDate?: string }) => {
    if (!offer?.isActive) return false;
    if (!offer.startDate || !offer.endDate) return false;

    const now = new Date();
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);

    return now >= start && now <= end;
  };

  const getEffectivePrice = (product: ProductType): number => {
    const offerActive = isOfferActive(product.offer);
    const price = product.price;
    const discountPercent = product.discount;

    if (offerActive && discountPercent > 0) {
      return Math.round(price - (price * discountPercent) / 100);
    }

    return price;
  };

  let subtotal = 0;
  let totalDiscount = 0;
  let totalAfterDiscount = 0;
  let totalQuantity = 0;

  for (const item of cartItems) {
    const product = products.find((p) => p._id === item.productId && p.stock > 0);
    if (!product) continue;

    const price = product.price;
    const effectivePrice = getEffectivePrice(product);

    subtotal += price * item.quantity;
    totalDiscount += (price - effectivePrice) * item.quantity;
    totalAfterDiscount += effectivePrice * item.quantity;
    totalQuantity += item.quantity;
  }

  const couponDiscountAmount = (totalAfterDiscount * couponDiscountPercent) / 100;
  const grandTotal = totalAfterDiscount - couponDiscountAmount;

  return {
    subtotal,
    totalDiscount,
    totalAfterDiscount,
    couponDiscountAmount,
    grandTotal,
    totalQuantity,
  };
};
