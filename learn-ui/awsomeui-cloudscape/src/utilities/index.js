export const buildUserDetails = (user) => {
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
  return transformed;
};
