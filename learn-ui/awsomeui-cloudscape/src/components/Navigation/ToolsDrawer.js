import React from 'react';
import { HelpPanel } from '@cloudscape-design/components';

const ToolsDrawer = () => {
  return (
    <HelpPanel header={<h2>About Clouscape UI App</h2>}>
      <div>
        <p>
          This is a test app to show how to use Cloudscape components from AWS
          design system
        </p>
        <h3>Components Used</h3>
        <ul>
          <li>AppLayout</li>
          <li>SideNavigation</li>
          <li>HelpPanel</li>
          <li>Form</li>
          <li>Table</li>
        </ul>
        <h4>Hooks Used</h4>
        <ul>
          <li>useState</li>
          <li>useEffect</li>
          <li>useCollection from Cloudscape</li>
          <li>useParams from Cloudscape</li>
        </ul>
      </div>
    </HelpPanel>
  );
};

export default ToolsDrawer;
