import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconComponent from 'components/utils/icon';
import { useState } from 'react';

const ToolbarStyledComponent = styled(Toolbar)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const AppBarStyledComponent = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'drawerOpen' && prop !== 'noHover' && prop !== 'onTop',
})(({ drawerOpen, noHover, onTop, theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[0],
  marginLeft: theme.spacing(0),
  width: `calc(100% - ${theme.spacing(0)})`,
  ...(noHover && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
      transition: theme.transitions.create('width', {
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
  ...(!onTop && {
    outline: `1px solid ${theme.palette.divider}`,
  }),
}));

const NavbarComponent = ({ drawerOpen, handleDrawerOpen, noHover }) => {
  // States
  const [onTop, setOnTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY >= 25) setOnTop(false);
    else setOnTop(true);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <AppBarStyledComponent
      position='fixed'
      drawerOpen={drawerOpen}
      noHover={noHover}
      onTop={onTop}
    >
      <ToolbarStyledComponent sx={{ px: 1 }}>
        <IconButton
          onClick={handleDrawerOpen}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <IconComponent icon='list' iconType='phosphor' weight='regular' />
        </IconButton>
        <Box noWrap sx={{ flexGrow: 1 }} component='div' />
        <Stack spacing={2} direction='row'>
          <Avatar>N</Avatar>
          <Typography
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Name Placeholder
          </Typography>
        </Stack>
      </ToolbarStyledComponent>
    </AppBarStyledComponent>
  );
};

export default NavbarComponent;
