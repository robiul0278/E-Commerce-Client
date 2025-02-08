import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalPrice: 0,
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist(state, action) {
            const payload = action.payload;
            const existingItem = state.products.find((item) => item._id === payload._id);
            if (existingItem) {
                // state.message = "Already added to wishlist!";
            } else {
                state.products.push(payload);
                state.totalPrice += payload.price;
            }
        },
        removeToWishlist(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item._id === id);
            console.log(findItem);
            if (findItem) {
                state.products = state.products.filter((item) => item._id !== id);
                state.totalPrice -= findItem.price;
            }
        }
    }
})

export const {addToWishlist, removeToWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;