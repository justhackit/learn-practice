// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Authenticator } from '@aws-amplify/ui-react';
import {
  AppLayout,
  Flashbar,
  FlashbarProps,
} from '@cloudscape-design/components';

import Topbar from './components/Navigation/Topbar';
import NavigationDrawer from './components/Navigation/NavigationDrawer';
import ToolsDrawer from './components/Navigation/ToolsDrawer';
import AppRoutes from './AppRoutes';

const App = () => {
  const [showNotifications, setShowNotifications] = useState(
    [] as FlashbarProps.MessageDefinition[]
  );

  return (
    <Authenticator.Provider>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <Topbar />
      </div>
      <BrowserRouter>
        <AppLayout
          navigation={<NavigationDrawer></NavigationDrawer>}
          tools={<ToolsDrawer></ToolsDrawer>}
          notifications={<Flashbar items={showNotifications} />}
          content={<AppRoutes setNotifications={setShowNotifications} />}
        />
      </BrowserRouter>
    </Authenticator.Provider>
  );
};

//export default withAuthenticator(App);
export default App;
