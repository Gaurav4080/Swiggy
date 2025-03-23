import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "authSlice",
    initialState : {
        UserData : JSON.parse(localStorage.getItem("userData"))
    },
    reducers : {
        addUserData : (state, action) => {
            state.UserData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload))
        },
        removeUserData : (state) => {
            state.UserData = null
            localStorage.removeItem("UserData")
        },
    }
})

export const { addUserData, removeUserData} = authSlice.actions;
export default authSlice.reducer;