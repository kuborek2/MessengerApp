import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import loginSlice from './loginSlice';

export default configureStore({
    reducer: {
      login: loginSlice,
      chat: chatSlice,
    }
  });