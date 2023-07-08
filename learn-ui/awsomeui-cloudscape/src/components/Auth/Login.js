import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Container, Header } from '@cloudscape-design/components';

const Login = () => {
  return (
    <Container header={<Header variant="h2">Author</Header>}>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <p>Welcome {JSON.stringify(user)}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
        {(authState) => console.log(authState)}
      </Authenticator>
    </Container>
  );
};
export default Login;
