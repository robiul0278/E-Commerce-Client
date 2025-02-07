import { configureStore } from '@reduxjs/toolkit'
import productSlice from "./features/productSlice"
import cartSlice from "./features/cartSlice"

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
})

export default store;