import { createSlice } from '@reduxjs/toolkit';

/*
const transformed = {
    user: {
      name: user.signInUserSession.idToken.payload.name,
      email: user.signInUserSession.idToken.payload.email,
      groups: user.signInUserSession.idToken.payload['cognito:groups'],
    },
    auth: {
      token_issued_at: user.signInUserSession.idToken.payload.iat,
      token_expires_at: user.signInUserSession.idToken.payload.exp,
    },
  };
*/
export interface UserAuthState {
  userAuth: {
    user: {
      name: string;
      email: string;
      groups: string[];
    };
    auth: {
      token_issued_at: number;
      token_expires_at: number;
    };
  };
}

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
      state.user = {};
      state.auth = {};
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
