import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice
    }
})

export default store;