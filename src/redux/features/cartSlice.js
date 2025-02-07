import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // console.log("New Item:", newItem); // Debugging
            const existingItem = state.products.find((item) => item.id === newItem._id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.products.push({
                    id: newItem._id,
                    price: newItem.price,
                    title: newItem.title,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            }
            // Update the total quantity and total price of the cart
            state.totalQuantity++;
            state.totalPrice += newItem.price;
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem) {
                state.totalPrice -= findItem.totalPrice;
                state.totalQuantity -= findItem.totalQuantity;
                state.products = state.products.filter((item) => item.id !== id);
            }
        },
        increaseQuantity(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem) {
                findItem.quantity++;
                findItem.totalPrice += findItem.price;
                state.totalQuantity++;
                state.totalPrice += findItem.price;
            }
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem && findItem.quantity > 1) {

                if (findItem) {
                    findItem.quantity--;
                    findItem.totalPrice -= findItem.price;
                    state.totalQuantity--;
                    state.totalPrice -= findItem.price;
                }
            }
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;