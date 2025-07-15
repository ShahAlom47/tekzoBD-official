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



  // ✅ Load cart on mount
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        if (userEmail) {
          const local = getLocalCart();
          if (local.length) {
            await syncCartToDB(local, userEmail);
            clearLocalCart();
          }

          const response = await getUserCart(userEmail);
          const data =response?.data as Cart
          dispatch(setCartItems(data?.items || []));
        } else {
          dispatch(setCartItems(getLocalCart()));
        }
      } catch (err) {
        console.error("Cart initialization failed:", err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [userEmail, dispatch]);

  // ✅ Add to Cart
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
        toast.error("Failed to add to cart");
        console.error(err);
      }
    },
    [reduxCartItems, userEmail, dispatch]
  );

  // ✅ Remove from Cart
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
        toast.error("Failed to remove from cart");
        console.error(err);
      }
    },
    [reduxCartItems, userEmail, dispatch]
  );

  // ✅ Update Quantity
// ✅ Debounced API updater - no need to reference outside state
const debouncedUpdate = useCallback(
  debounce(async (item: CartItem, userEmail: string) => {
    try {
      await updateCartItemQty(item.productId, item.quantity, userEmail);
      toast.success("Quantity updated");
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  }, 400),
  []
);

// ✅ Quantity updater
const updateQuantity = useCallback(
  (productId: string, quantity: number) => {
    if (quantity < 1) return;

    const updatedItem: CartItem = {
      productId,
      quantity,
      addedAt: new Date().toISOString(),
    };

    // Update Redux first
    dispatch(addOrUpdateCartItem(updatedItem));

    // Update LocalStorage
    const updatedCart = getLocalCart().map((item) =>
      item.productId === productId ? updatedItem : item
    );
    saveLocalCart(updatedCart);

    // Debounce API update
    if (userEmail) {
      debouncedUpdate(updatedItem, userEmail);
    }
  },
  [dispatch, userEmail, debouncedUpdate]
);


  // ✅ Clear All
  const clearCart = useCallback(() => {
    dispatch(clearCartItems());

    if (userEmail) {
      toast.success("Cart cleared from DB");
    } else {
      clearLocalCart();
      toast.success("Local cart cleared");
    }
  }, [userEmail, dispatch]);

  // ✅ Is in cart checker
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
