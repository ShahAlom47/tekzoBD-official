// redux/features/wishlist/wishlistSlice.ts

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
    setWishlistRedux: (state, action: PayloadAction<string[]>) => {
      state.wishlistIds = action.payload;
    },
    clearWishlistRedux: (state) => {
      state.wishlistIds = [];
    },
  },
});

export const { setWishlistRedux, clearWishlistRedux } = wishlistSlice.actions;
export default wishlistSlice.reducer;
