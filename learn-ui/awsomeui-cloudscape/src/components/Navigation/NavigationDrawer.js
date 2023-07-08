import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideNavigation } from '@cloudscape-design/components';

const NavigationDrawer = () => {
  const [activeHref, setActiveHref] = useState('#/');
  const goto = useNavigate();
  return (
    <SideNavigation
      activeHref={activeHref}
      header={{ text: 'A Cloudscape App' }}
      items={[
        { type: 'link', text: 'Dashboard', href: '/' },
        {
          type: 'section',
          text: 'Resources',
          items: [
            { type: 'link', text: 'Authors', href: '/authors' },
            { type: 'link', text: 'Books', href: '/books' },
          ],
        },
        {
          type: 'section',
          text: 'Useful Links',
          items: [
            {
              type: 'link',
              text: 'Cloudscape Components Documentation',
              href: 'https://cloudscape.design/components/',
              external: true,
            },
          ],
        },
        { type: 'link', text: 'Logout', href: '/logout' },
      ]}
      onFollow={(event) => {
        if (!event.detail.external) {
          event.preventDefault();
          setActiveHref(event.detail.href);
          goto(event.detail.href);
        }
      }}
    />
  );
};

export default NavigationDrawer;
