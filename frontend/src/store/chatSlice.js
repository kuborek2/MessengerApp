import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserName: "",
    usersList: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedUserName: (state, action) => {
          state.selectedUserName = action.payload
        },
        setUsersList: (state, action) => {
          state.usersList = action.payload
        },
    },
});

export const { setSelectedUserName, setUsersList } = chatSlice.actions;

export default chatSlice.reducer;