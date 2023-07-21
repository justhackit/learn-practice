import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Location } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { buildUserDetails } from '../../utilities';
import { useDispatch } from 'react-redux';
import { signIn } from '../../state-slices/authSlice';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location: Location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  const dispatch = useDispatch();
  if (route !== 'authenticated') {
    return redirectToLoginPage(location);
  } else {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        const userDetails = buildUserDetails(
          user.getSignInUserSession()?.getIdToken()!
        );
        dispatch(signIn(userDetails));
      })
      .catch((err) => {
        console.log(`Error while authenticating : ${err}`);
        return redirectToLoginPage(location);
      });
  }
  return children;
};

const redirectToLoginPage = (srcLocation: Location) => {
  return <Navigate to="/login" state={{ from: srcLocation }} replace />;
};

export default RequireAuth;
