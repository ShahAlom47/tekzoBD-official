import { CartItem } from "@/Interfaces/cartInterface";
import { ProductType } from "@/Interfaces/productInterfaces";

export const useCartSummary = (
  cartItems: CartItem[],
  products: ProductType[],
  couponDiscountPercent: number = 0
) => {
  // subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const product = products.find(p => p._id === item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  // general discount logic (if you have it)
  const totalDiscount = 0; // Or however you calculate this
  const totalAfterDiscount = subtotal - totalDiscount;

  // coupon discount
  const couponDiscountAmount = (totalAfterDiscount * couponDiscountPercent) / 100;

  const grandTotal = totalAfterDiscount - couponDiscountAmount;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    totalDiscount,
    totalAfterDiscount,
    couponDiscountAmount,
    grandTotal,
    totalQuantity,
  };
};
