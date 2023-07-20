import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//Configure AWS Cognito values
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_YmnrmyVop',
    userPoolWebClientId: '1ecuuq5v1vb90eqln1a1n5cvq9',
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    </Provider>
  </React.StrictMode>
);
