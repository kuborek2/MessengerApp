import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    userName: ""
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleLogin: (state, action) => {
            state.isUserLoggedIn = !(state.isUserLoggedIn)
            state.userName = action.payload
        },
    },
});

export const { toggleLogin } = loginSlice.actions;

export default loginSlice.reducer;