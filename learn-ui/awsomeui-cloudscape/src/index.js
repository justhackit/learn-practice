import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { createContext } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Configure AWS Cognito values
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_YmnrmyVop',
    userPoolWebClientId: '1ecuuq5v1vb90eqln1a1n5cvq9',
  },
});
//Global state to store authentication details
export const UserContext = createContext({});

root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </React.StrictMode>
);
