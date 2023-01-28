import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import chatSlice from './chatSlice';
import loginSlice from './loginSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export default configureStore({
    reducer: {
      login: loginSlice,
      chat: chatSlice,
    },
    middleware: customizedMiddleware,
  });