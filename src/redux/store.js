import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./features/productSlice"
import cartSlice from "./features/cartSlice"
import wishlistSlice from "./features/wishlistSlice"

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
})

export default store;