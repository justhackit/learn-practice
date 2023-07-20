import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@cloudscape-design/components/input';
import { Auth } from 'aws-amplify';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { UserAuthState, signOut } from '../../state-slices/authSlice';

const Topbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector((state: UserAuthState) => state.userAuth.user);
  const { name, email } = user;
  const dispatch = useDispatch();
  const i18nStrings = {
    searchIconAriaLabel: 'Search',
    searchDismissIconAriaLabel: 'Close search',
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
    overflowMenuBackIconAriaLabel: 'Back',
    overflowMenuDismissIconAriaLabel: 'Close menu',
  };

  const profileActions = [
    { type: 'button', id: 'profile', text: 'Profile' },
    { type: 'button', id: 'preferences', text: 'Preferences' },
    { type: 'button', id: 'security', text: 'Security' },
    {
      type: 'menu-dropdown',
      id: 'support-group',
      text: 'Support',
      items: [
        {
          id: 'documentation',
          text: 'Documentation',
          href: '#',
          external: true,
          externalIconAriaLabel: ' (opens in new tab)',
        },
        {
          id: 'feedback',
          text: 'Feedback',
          href: '#',
          external: true,
          externalIconAriaLabel: ' (opens in new tab)',
        },
        { id: 'support', text: 'Customer support' },
      ],
    },
    {
      type: 'button',
      id: 'signout',
      text: 'Sign out',
    },
  ];
  return (
    <TopNavigation
      i18nStrings={i18nStrings}
      identity={{
        href: '#',
        title: 'My Cloudsome App',
        logo: { src: 'logo192.png', alt: 'Service name logo' },
      }}
      search={
        <Input
          ariaLabel="Input field"
          clearAriaLabel="Clear"
          value={searchValue}
          type="search"
          placeholder="Search"
          onChange={({ detail }) => setSearchValue(detail.value)}
        />
      }
      utilities={[
        {
          type: 'button',
          iconName: 'notification',
          ariaLabel: 'Notifications',
          badge: true,
          disableUtilityCollapse: true,
        },
        {
          type: 'button',
          iconName: 'settings',
          title: 'Settings',
          ariaLabel: 'Settings',
        },
        {
          type: 'menu-dropdown',
          text: name,
          description: email,
          iconName: 'user-profile',
          items: profileActions,
          onItemClick: (eve) => {
            if (eve.detail.id === 'signout') {
              dispatch(signOut());
              Auth.signOut();
            }
          },
        },
      ]}
    />
  );
};

export default Topbar;
