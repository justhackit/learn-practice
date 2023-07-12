import { configureStore } from '@reduxjs/toolkit';
import authSlice from './state-slices/authSlice';

export const store = configureStore({
  reducer: {
    userAuth: authSlice,
  },
  devTools: true,
});
