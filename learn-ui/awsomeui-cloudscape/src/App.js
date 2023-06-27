// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppLayout } from '@cloudscape-design/components';
import { Box } from '@cloudscape-design/components';

import NavigationDrawer from './components/Navigation/NavigationDrawer';
import ToolsDrawer from './components/Navigation/ToolsDrawer';
import Dashboard from './components/Navigation/Dashboard';
import AuthorsList from './components/Authors/AuthorsList';

function NotFoundPage() {
  return <Box variant="h1">404 Page Not Found</Box>;
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout
        navigation={<NavigationDrawer></NavigationDrawer>}
        tools={<ToolsDrawer></ToolsDrawer>}
        content={
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/authors" element={<AuthorsList />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        }
      />
    </BrowserRouter>
  );
}

export default App;
