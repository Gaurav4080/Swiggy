import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        searchBarToggle: false,
        logInToggle: false,
        isDiffRes: false
    },
    reducers: {
        toggleSearchBar: (state) => {
            state.searchBarToggle = !state.searchBarToggle
        },
        toggleLogIn: (state) => {
            state.logInToggle = !state.logInToggle
        },
        toggleDiffRes: (state) => {
            state.isDiffRes = !state.isDiffRes
        }
    }
})

export const { toggleSearchBar, toggleLogIn, toggleDiffRes } = toggleSlice.actions;
export default toggleSlice.reducer;