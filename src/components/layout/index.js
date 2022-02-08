import { Toolbar, useMediaQuery } from '@mui/material';
import { Fragment, useState } from 'react';
import BodyComponent from './components/body';
import DrawerComponent from './components/drawer';
import NavbarComponent from './components/navbar';

export const pages = [
  {
    text: 'Home',
    route: '/',
    icon: 'compass',
    end: true,
  },
];

const LayoutComponent = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const noHover = useMediaQuery('(hover: none)');

  const handleToggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  return (
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
  );
};

export default LayoutComponent;
