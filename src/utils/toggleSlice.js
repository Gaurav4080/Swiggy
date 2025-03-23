import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        searchBarToggle: false,
        logInToggle: false
    },
    reducers: {
        toggleSearchBar: (state) => {
            state.searchBarToggle = !state.searchBarToggle
        },
        toggleLogIn: (state) => {
            state.logInToggle = !state.logInToggle
        }
    }
})

export const { toggleSearchBar, toggleLogIn } = toggleSlice.actions;
export default toggleSlice.reducer;