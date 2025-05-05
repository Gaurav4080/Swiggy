import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import coordSlice from "./coordSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice,
        coordSlice,
        filterSlice,
        authSlice,
        searchSlice
    }
})

export default store;