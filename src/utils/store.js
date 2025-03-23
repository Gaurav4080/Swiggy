import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import coordSlice from "./coordSlice";

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice,
        coordSlice
    }
})

export default store;