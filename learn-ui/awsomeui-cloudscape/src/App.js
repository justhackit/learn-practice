// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserContext } from '.';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AppLayout, Flashbar } from '@cloudscape-design/components';
import { Box } from '@cloudscape-design/components';

import Topbar from './components/Navigation/Topbar';
import NavigationDrawer from './components/Navigation/NavigationDrawer';
import ToolsDrawer from './components/Navigation/ToolsDrawer';
import Dashboard from './components/Navigation/Dashboard';
import AuthorsList from './components/Authors/AuthorsList';
import AuthorDetails from './components/Authors/AuthorDetails';

import { buildUserDetails } from './utilities';

function NotFoundPage() {
  return <Box variant="h1">404 Page Not Found</Box>;
}

function App({ signOut, user }) {
  const [showNotifications, setShowNotifications] = useState([]);
  const userDetails = buildUserDetails(user);
  return (
    <UserContext.Provider value={userDetails}>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <Topbar signOutUser={signOut} />
      </div>
      <BrowserRouter basename="/awsomeui">
        <AppLayout
          navigation={<NavigationDrawer></NavigationDrawer>}
          tools={<ToolsDrawer></ToolsDrawer>}
          notifications={<Flashbar items={showNotifications} />}
          content={
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/authors"
                element={
                  <AuthorsList setShowNotifications={setShowNotifications} />
                }
              ></Route>
              <Route
                path="/author/:authorId?"
                element={
                  <AuthorDetails setShowNotifications={setShowNotifications} />
                }
              ></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          }
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default withAuthenticator(App, false, {
  socialProviders: ['google'],
  includeGreetings: true,
});
