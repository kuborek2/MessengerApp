import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUserName: "",
    usersList: [],
    chatRooms: [{name: "CHATROOM", list: []}],
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
          if( state.chatRooms.findIndex((x) => x.name === action.payload.name) === -1 )
            state.chatRooms.push(action.payload)
        },
        pushToChatRoom: (state, action) => {
          let foundIndex = state.chatRooms.findIndex((elem) => elem.name === action.payload.chatName);
          state.chatRooms[foundIndex].list.push(action.payload.chatMessage)
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