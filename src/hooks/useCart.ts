// hooks/useCart.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { Cart, CartItem } from "@/Interfaces/cartInterface";
import { clearLocalCart, getLocalCart, saveLocalCart } from "@/utils/cart/cartLocalHelper";
import { addToCartDB, getUserCart, removeFromCartDB, syncCartToDB, updateCartItemQty } from "@/lib/allApiRequest/cartRequest/cartRequest";


export const useCart = () => {
  const { user } = useUser();
  const userEmail = user?.email;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load cart on mount
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (userEmail) {
        const localCart = getLocalCart();
        if (localCart.length) {
          await syncCartToDB(localCart, userEmail);
          clearLocalCart();
        }

        const res = await getUserCart(userEmail);
        const data = res?.data as Cart
        setCartItems(data.items);
      } else {
        const local = getLocalCart();
        setCartItems(local);
      }
      setLoading(false);
    };
    init();
  }, [userEmail]);

  // ✅ Add to cart
  const addToCart = useCallback(
    async (productId: string) => {
      const updatedCart = [...cartItems];
      const existing = updatedCart.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({
          productId,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }

      setCartItems(updatedCart);

      if (userEmail) {
        await addToCartDB({ productId, quantity: 1, userEmail });
      } else {
        saveLocalCart(updatedCart);
      }

      toast.success("Added to cart");
    },
    [cartItems, userEmail]
  );

  // ✅ Remove from cart
  const removeFromCart = useCallback(
    async (productId: string) => {
      const filtered = cartItems.filter((item) => item.productId !== productId);
      setCartItems(filtered);

      if (userEmail) {
        await removeFromCartDB(productId, userEmail);
      } else {
        saveLocalCart(filtered);
      }

      toast.success("Removed from cart");
    },
    [cartItems, userEmail]
  );

  // ✅ Update quantity
  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity < 1) return;
      const updated = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setCartItems(updated);

      if (userEmail) {
        await updateCartItemQty(productId, quantity, userEmail);
      } else {
        saveLocalCart(updated);
      }

      toast.success("Cart updated");
    },
    [cartItems, userEmail]
  );

  // ✅ Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    if (userEmail) {
      toast.success("Cart cleared from DB");
    } else {
      clearLocalCart();
      toast.success("Local cart cleared");
    }
  }, [userEmail]);

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
