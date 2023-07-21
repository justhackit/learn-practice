import { FlashbarProps } from '@cloudscape-design/components';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@cloudscape-design/components';

import Dashboard from './components/Navigation/Dashboard';
import RequireAuth from './components/Navigation/RequireAuth';
import AuthorsList from './components/Authors/AuthorsList';
import AuthorDetails from './components/Authors/AuthorDetails';
import Login from './components/Navigation/Login';

function NotFoundPage() {
  return <Box variant="h1">404 Page Not Found</Box>;
}

interface Props {
  setShowNotifications: (
    notifications: FlashbarProps.MessageDefinition[]
  ) => void;
}
const AppRoutes = (props: Props): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/authors"
        element={
          <RequireAuth>
            <AuthorsList setShowNotifications={props.setShowNotifications} />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/author/:authorId?"
        element={
          <AuthorDetails setShowNotifications={props.setShowNotifications} />
        }
      ></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
