import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  itemIds: string[];
}

const initialState: CartState = {
  itemIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartIds: (state, action: PayloadAction<string[]>) => {
      state.itemIds = action.payload;
    },
    addCartId: (state, action: PayloadAction<string>) => {
      if (!state.itemIds.includes(action.payload)) {
        state.itemIds.push(action.payload);
      }
    },
    removeCartId: (state, action: PayloadAction<string>) => {
      state.itemIds = state.itemIds.filter((id) => id !== action.payload);
    },
    clearCartIds: (state) => {
      state.itemIds = [];
    },
  },
});

export const { setCartIds, addCartId, removeCartId, clearCartIds } = cartSlice.actions;
export default cartSlice.reducer;
