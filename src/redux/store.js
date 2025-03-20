import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "./features/cartSlice"
import wishlistSlice from "./features/wishlistSlice"
import { baseApi } from './api/api';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;