import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  wishlistIds: string[];
}

const initialState: WishlistState = {
  wishlistIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string[]>) {
      state.wishlistIds = action.payload;
    },
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.wishlistIds.includes(action.payload)) {
        state.wishlistIds.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.wishlistIds = state.wishlistIds.filter(id => id !== action.payload);
    },
    clearWishlist(state) {
      state.wishlistIds = [];
    }
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
