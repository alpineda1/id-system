import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import ContentComponent from './drawer/content';
import PermanentComponent from './drawer/permanent';
import PersistentComponent from './drawer/persistent';

const DrawerComponent = ({
  drawerOpen,
  handleDrawerClose,
  handleToggleDrawer,
  noHover,
}) => {
  const theme = useTheme();
  const smallUpwards = useMediaQuery(theme.breakpoints.up('sm'));
  const mediumUpwards = useMediaQuery(theme.breakpoints.up('md'));

  return smallUpwards ? (
    <PermanentComponent
      variant='permanent'
      open={mediumUpwards ? !drawerOpen : drawerOpen}
      noHover={noHover}
    >
      <ContentComponent handleToggleDrawer={handleToggleDrawer} />
    </PermanentComponent>
  ) : (
    <PersistentComponent
      variant='temporary'
      ModalProps={{ onBackdropClick: handleDrawerClose }}
      open={drawerOpen}
    >
      <ContentComponent
        handleDrawerClose={handleDrawerClose}
        handleToggleDrawer={handleToggleDrawer}
      />
    </PersistentComponent>
  );
};

export default DrawerComponent;
