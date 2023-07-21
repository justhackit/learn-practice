import { CognitoIdToken } from 'amazon-cognito-identity-js';

export const buildUserDetails = (userToken: CognitoIdToken) => {
  const decodedPayload = userToken.decodePayload();
  const transformed = {
    user: {
      name: decodedPayload['name'],
      email: decodedPayload['email'],
      groups: decodedPayload['cognito:groups'],
    },
    auth: {
      token_issued_at: decodedPayload['iat'],
      token_expires_at: decodedPayload['exp'],
    },
  };
  return transformed;
};
