import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const { info, resInfo } = action.payload
            state.cartItems = [...state.cartItems, info]
            localStorage.setItem("cartData", JSON.stringify(state.cartItems));
            localStorage.setItem("resInfo", JSON.stringify(resInfo))
        },
        deleteItem: (state, action) => {
            const index = action.payload;

            if (state.cartItems.length > 1) {
                state.cartItems = state.cartItems.filter((_, i) => i !== index);
                localStorage.setItem("cartData", JSON.stringify(state.cartItems));
            } else {
                state.cartItems = [];
                state.resInfo = [];
                localStorage.removeItem("cartData");
                localStorage.removeItem("resInfo");
            }
        },
        clearCartData: (state) => {
            state.cartItems = [];
            state.resInfo = [];
            localStorage.removeItem("cartData");
            localStorage.removeItem("resInfo");
        }
    }
})

export const { addToCart, deleteItem, clearCartData } = cartSlice.actions;
export default cartSlice.reducer