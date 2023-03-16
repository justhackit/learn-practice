import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (userAuth = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...userAuth, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...userAuth, isSignedIn: false, userId: null };
    default:
      return userAuth;
  }
};
