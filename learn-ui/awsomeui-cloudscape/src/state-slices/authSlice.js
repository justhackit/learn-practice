import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  auth: {},
};

export const authSlice = createSlice({
  name: 'userAuthSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
      state.auth = action.payload.auth;
    },
    signOut: (state) => {
      state.user = null;
      state.auth = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export const user = (state) => state.userAuth.user;
export default authSlice.reducer;
