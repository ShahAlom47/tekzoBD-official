// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import dashSearchReducer from '../features/search/DashSearchSlice'
import globalSearchReducer from "../features/search/GlobalSearchSlice"
import categoryReducer  from '../features/category/categorySlice'
import wishlistReducer from "../features/wishList/wishlistSlice"
import cartReducer from "../features/cartSlice/cartSlice"


export const store = configureStore({
  reducer: {
    dashSearch: dashSearchReducer,
    globalSearch: globalSearchReducer,
    categories: categoryReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
