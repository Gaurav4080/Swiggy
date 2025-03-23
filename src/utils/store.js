import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import coordSlice from "./coordSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice,
        coordSlice,
        filterSlice,
        authSlice
    }
})

export default store;