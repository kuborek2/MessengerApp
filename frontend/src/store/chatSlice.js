import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserName: "",
    usersList: [],
    chatRooms: new Map([['CHATROOM',[]]]),
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
        setChatRooms: (state, action) => {
          state.chatRooms = action.payload
        },
        addChatRoom: (state, action) => {
          state.chatRooms.set(action.payload.name, action.payload.list)
        },
        pushToChatRoom: (state, action) => {
          state.chatRooms.get(action.payload.chatName).push(action.payload.chatMessage)
        },
    },
});

export const { setSelectedUserName, setUsersList, setChatRooms, addChatRoom, pushToChatRoom } = chatSlice.actions;

export default chatSlice.reducer;