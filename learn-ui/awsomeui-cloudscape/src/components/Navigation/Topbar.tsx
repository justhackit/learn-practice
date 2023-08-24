import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@cloudscape-design/components/input';
import { Auth } from 'aws-amplify';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { UserAuthState, signOut } from '../../state-slices/authSlice';
import { ButtonDropdownProps } from '@cloudscape-design/components';

const Topbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector((state: UserAuthState) => state.userAuth.user);
  const dispatch = useDispatch();
  const i18nStrings = {
    searchIconAriaLabel: 'Search',
    searchDismissIconAriaLabel: 'Close search',
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
    overflowMenuBackIconAriaLabel: 'Back',
    overflowMenuDismissIconAriaLabel: 'Close menu',
  };

  const [profileActions, setProfileActions] = useState(
    [] as ButtonDropdownProps.Items
  );

  useEffect(() => {
    console.log("From Topbar's useEffect(). User auth state changed");
    const profileActionsOfGuestUser: ButtonDropdownProps.Items = [
      { id: 'signin', text: 'Sign In', href: '/login' },
    ];
    const profileActionsOfSignInUser: ButtonDropdownProps.Items = [
      { id: 'profile', text: 'Profile' },
      { id: 'security', text: 'Security' },
      {
        text: 'Support',
        items: [
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
        text: 'Sign out',
        id: 'signout',
      },
    ];
    if (user.name && user.name.length > 0) {
      setProfileActions(profileActionsOfSignInUser);
    } else {
      setProfileActions(profileActionsOfGuestUser);
    }
  }, [user]);
  return (
    <TopNavigation
      i18nStrings={i18nStrings}
      identity={{
        href: '#',
        title: 'My Cloudsome App !',
        logo: { src: './logo192.png', alt: 'Service name logo' },
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
          text: user.name,
          description: user.email,
          iconName: 'user-profile',
          items: profileActions,
          onItemClick: (eve) => {
            if (eve.detail.id === 'signout') {
              dispatch(signOut());
              console.log('signing out the user');
              Auth.signOut();
            }
          },
        },
      ]}
    />
  );
};

export default Topbar;
