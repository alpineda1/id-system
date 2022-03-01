import { Toolbar, useMediaQuery } from '@mui/material';
import { useAuth } from 'contexts/auth';
import React, { Fragment, useState } from 'react';
import BodyComponent from './components/body';
import DrawerComponent from './components/drawer';
import NavbarComponent from './components/navbar';

export const pages = [
  {
    text: 'Form',
    route: '/form',
    icon: 'textbox',
    end: false,
    roles: ['user'],
  },
  {
    text: 'Preview',
    route: '/preview',
    icon: 'identification-card',
    end: false,
    roles: ['user'],
    hasID: true,
  },
  {
    text: 'History',
    route: '/history',
    icon: 'users',
    end: false,
    roles: ['admin'],
  },
  {
    text: 'Students List',
    route: '/students',
    icon: 'clock-counter-clockwise',
    end: false,
    roles: ['admin'],
  },
];

export const utils = [];

const LayoutComponent = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const noHover = useMediaQuery('(hover: none)');

  const { currentUser } = useAuth();

  const handleToggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return currentUser ? (
    <Fragment>
      <NavbarComponent
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        noHover={noHover}
      />
      <DrawerComponent
        drawerOpen={drawerOpen}
        handleToggleDrawer={handleToggleDrawer}
        handleDrawerClose={handleDrawerClose}
        noHover={noHover}
      />
      <BodyComponent drawerOpen={drawerOpen} noHover={noHover}>
        <Toolbar />
        {children}
      </BodyComponent>
    </Fragment>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default LayoutComponent;
