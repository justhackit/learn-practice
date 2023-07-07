// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppLayout, Flashbar } from '@cloudscape-design/components';
import { Box } from '@cloudscape-design/components';

import NavigationDrawer from './components/Navigation/NavigationDrawer';
import ToolsDrawer from './components/Navigation/ToolsDrawer';
import Dashboard from './components/Navigation/Dashboard';
import AuthorsList from './components/Authors/AuthorsList';
import AuthorDetails from './components/Authors/AuthorDetails';

function NotFoundPage() {
  return <Box variant="h1">404 Page Not Found</Box>;
}

function App() {
  const [showNotifications, setShowNotifications] = useState([]);
  return (
    <BrowserRouter>
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
              element={<AuthorDetails addNotification={setShowNotifications} />}
            ></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        }
      />
    </BrowserRouter>
  );
}

export default App;
