import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"

const store = configureStore({
    reducer : {
        toggleSlice: toggleSlice
    }
})

export default store;