import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    userName: "",
    userObject: {
        userName: "",
        password: "",
        status: "",
        imageSrc: ""
    }
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        toggleLogin: (state, action) => {
            state.isUserLoggedIn = !(state.isUserLoggedIn)
            state.userObject = action.payload
            state.userName = action.payload.userName;
        },
    },
});

export const { toggleLogin } = loginSlice.actions;

export default loginSlice.reducer;