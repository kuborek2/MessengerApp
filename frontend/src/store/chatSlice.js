import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserName: "",
    usersList: [],
    chatRooms: new Map([['CHATROOM',[]]]),
    stompClient: null
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
        changeUserStatus: (state, action) => {
          state.usersList[action.payload.index].status = action.payload.newStatus;
        },
        setStompClient: (state, action) => {
          state.stompClient = action.payload
        },
    },
});

export const { 
  setSelectedUserName,
  setUsersList,
  setChatRooms,
  addChatRoom,
  pushToChatRoom,
  changeUserStatus,
  setStompClient
} = chatSlice.actions;

export default chatSlice.reducer;