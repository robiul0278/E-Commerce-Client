import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "./features/cartSlice"
import wishlistSlice from "./features/wishlistSlice"

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
})

export default store;