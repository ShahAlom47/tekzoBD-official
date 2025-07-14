"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import { Cart, CartItem } from "@/Interfaces/cartInterface";
import {
  clearLocalCart,
  getLocalCart,
  saveLocalCart,
} from "@/utils/cart/cartLocalHelper";
import {
  addToCartDB,
  getUserCart,
  removeFromCartDB,
  syncCartToDB,
  updateCartItemQty,
} from "@/lib/allApiRequest/cartRequest/cartRequest";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import {
  addCartId,
  clearCartIds,
  removeCartId,
  setCartIds,
} from "@/redux/features/cartSlice/cartSlice";

export const useCart = () => {
  const { user } = useUser();
  const userEmail = user?.email;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  // 🟢 Redux from state
  const itemIds = useAppSelector((state) => state.cart.itemIds);
  const itemCount = itemIds?.length;

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
        const data = res?.data as Cart;

        setCartItems(data?.items);
        dispatch(setCartIds(data?.items?.map((item) => item.productId)));
      } else {
        const local = getLocalCart();
        setCartItems(local);
        dispatch(setCartIds(local.map((item) => item.productId)));
      }
      setLoading(false);
    };
    init();
  }, [userEmail, dispatch]);

  // ✅ Add to cart
// ✅ Add to cart
const addToCart = useCallback(
  async (productId: string) => {
    // If already in cart, just show toast and return
    if (itemIds?.includes(productId)) {
      toast.error("Already in cart");
      return;
    }

    const updatedCart = [...cartItems];
    updatedCart.push({
      productId,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });

    setCartItems(updatedCart);
    dispatch(addCartId(productId));

    if (userEmail) {
      await addToCartDB({ productId, quantity: 1, userEmail });
    } else {
      saveLocalCart(updatedCart);
    }

    toast.success("Added to cart");
  },
  [cartItems, userEmail, itemIds, dispatch]
);


  // ✅ Remove from cart
  const removeFromCart = useCallback(
    async (productId: string) => {
      const filtered = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(filtered);
      dispatch(removeCartId(productId));

      if (userEmail) {
        await removeFromCartDB(productId, userEmail);
      } else {
        saveLocalCart(filtered);
      }

      toast.success("Removed from cart");
    },
    [cartItems, userEmail, dispatch]
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
    dispatch(clearCartIds());

    if (userEmail) {
      toast.success("Cart cleared from DB");
    } else {
      clearLocalCart();
      toast.success("Local cart cleared");
    }
  }, [userEmail, dispatch]);

  // check Cart 
 const useIsInCart = (productId: string): boolean => {
  const itemIds = useAppSelector((state) => state.cart.itemIds);
  return itemIds.includes(productId);
};

  return {
    cartItems,    // full cart item object with qty
    itemIds,      // only productId array from Redux
    itemCount,    // number of items in cart
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    useIsInCart,

  };
};
