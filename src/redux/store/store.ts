// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import dashSearchReducer from '../features/search/DashSearchSlice'
import globalSearchReducer from "../features/search/GlobalSearchSlice"
import categorySlice  from '../features/category/categorySlice'
import wishlistSlice from "../features/wishList/wishlistSlice"


export const store = configureStore({
  reducer: {
    dashSearch: dashSearchReducer,
    globalSearch: globalSearchReducer,
    categories: categorySlice,
    wishlist: wishlistSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
