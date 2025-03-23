import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import coordSlice from "./coordSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice,
        coordSlice,
        filterSlice
    }
})

export default store;