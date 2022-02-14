import { styled } from '@mui/system';
import React from 'react';

const MainStyledComponent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'noHover',
})(({ drawerOpen, noHover, theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginLeft: theme.spacing(0),
  ...(noHover && {
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  width: `calc(100% - ${theme.spacing(0)})`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(7),
    width: `calc(100% - ${theme.spacing(7)})`,
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(34),
    width: `calc(100% - ${theme.spacing(34)})`,
  },
  ...(drawerOpen && {
    ...(noHover && {
      transition: theme.transitions.create(['all'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(30),
      width: `calc(100% - ${theme.spacing(30)})`,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(9),
      width: `calc(100% - ${theme.spacing(9)})`,
    },
  }),
}));

const BodyComponent = ({ children, drawerOpen, noHover }) => {
  return (
    <MainStyledComponent drawerOpen={drawerOpen} noHover={noHover}>
      {children}
    </MainStyledComponent>
  );
};

export default BodyComponent;
