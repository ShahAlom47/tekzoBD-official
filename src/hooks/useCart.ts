"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import { Cart, CartItem } from "@/Interfaces/cartInterface";
import {
  addToCartDB,
  getUserCart,
  removeFromCartDB,
  syncCartToDB,
  updateCartItemQty,
} from "@/lib/allApiRequest/cartRequest/cartRequest";
import {
  getLocalCart,
  saveLocalCart,
  clearLocalCart,
} from "@/utils/cart/cartLocalHelper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import {
  setCartItems,
  addOrUpdateCartItem,
  removeCartItem,
  clearCartItems,
} from "@/redux/features/cartSlice/cartSlice";
import debounce from "lodash.debounce";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const userEmail = user?.email || "";
  const reduxCartItems = useAppSelector((state) => state.cart.items);
  const itemCount = reduxCartItems.length;
  const [loading, setLoading] = useState(true);

  // ✅ Debounced API call map for each product
  const debouncedUpdateMap: { [key: string]: ReturnType<typeof debounce> } = {};

  // ✅ Load cart
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        if (userEmail) {
          const localCart = getLocalCart();
          if (localCart.length) {
            await syncCartToDB(localCart, userEmail);
            clearLocalCart();
          }

          const res = await getUserCart(userEmail);
          const data = res?.data as Cart;
          dispatch(setCartItems(data?.items || []));
        } else {
          dispatch(setCartItems(getLocalCart()));
        }
      } catch (err) {
        console.error("Cart init error:", err);
        toast.error("Cart load failed");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [userEmail, dispatch]);

  // ✅ Add to cart
  const addToCart = useCallback(
    async (productId: string) => {
      const exists = reduxCartItems.find((item) => item.productId === productId);
      if (exists) {
        toast.error("Already in cart");
        return;
      }

      const newItem: CartItem = {
        productId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };

      dispatch(addOrUpdateCartItem(newItem));

      try {
        if (userEmail) {
          await addToCartDB({ ...newItem, userEmail });
        } else {
          const updatedCart = [...reduxCartItems, newItem];
          saveLocalCart(updatedCart);
        }
        toast.success("Added to cart");
      } catch (err) {
        toast.error("Add failed");
        console.error(err);
      }
    },
    [reduxCartItems, userEmail, dispatch]
  );

  // ✅ Remove from cart
  const removeFromCart = useCallback(
    async (productId: string) => {
      dispatch(removeCartItem(productId));

      try {
        if (userEmail) {
          await removeFromCartDB(productId, userEmail);
        } else {
          const updated = reduxCartItems.filter((item) => item.productId !== productId);
          saveLocalCart(updated);
        }
        toast.success("Removed from cart");
      } catch (err) {
        toast.error("Remove failed");
        console.error(err);
      }
    },
    [reduxCartItems, userEmail, dispatch]
  );

  // ✅ Update quantity with per-item debounce
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) return;

      const updatedItem: CartItem = {
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      };

      // Redux update
      dispatch(addOrUpdateCartItem(updatedItem));

      // LocalStorage update
      const updatedCart = reduxCartItems.map((item) =>
        item.productId === productId ? updatedItem : item
      );
      if (!userEmail) {
        saveLocalCart(updatedCart);
      }

      // Per-product debounce
      if (userEmail) {
        if (!debouncedUpdateMap[productId]) {
          debouncedUpdateMap[productId] = debounce(
            async (item: CartItem) => {
              try {
                await updateCartItemQty(item.productId, item.quantity, userEmail);
                toast.success("Cart updated");
              } catch (err) {
                console.error("Update error:", err);
              }
            },
            500,
            { leading: false, trailing: true }
          );
        }
        debouncedUpdateMap[productId](updatedItem);
      }
    },
    [reduxCartItems, dispatch, userEmail]
  );

  // ✅ Clear all
  const clearCart = useCallback(() => {
    dispatch(clearCartItems());
    if (userEmail) {
      toast.success("Cart cleared from DB");
    } else {
      clearLocalCart();
      toast.success("Local cart cleared");
    }
  }, [userEmail, dispatch]);

  // ✅ Check in cart
  const useIsInCart = (productId: string): boolean => {
    return reduxCartItems.some((item) => item.productId === productId);
  };

  return {
    cartItems: reduxCartItems,
    itemCount,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    useIsInCart,
  };
};
