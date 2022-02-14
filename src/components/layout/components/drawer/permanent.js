import { Drawer } from '@mui/material';
import { styled } from '@mui/system';

const opened = (theme) => ({
  width: theme.spacing(30),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(34),
  },
});

const closed = (noHover, theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(7),
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(9),
  },
  ...(!noHover && {
    '&:hover': {
      width: theme.spacing(30),
      boxShadow: theme.shadows[6],
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(34),
      },
    },
  }),
});

const PermanentComponent = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'noHover',
})(({ noHover, open, theme }) => ({
  width: theme.spacing(30),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...opened(theme),
    '& .MuiDrawer-paper': opened(theme),
  }),
  ...(!open && {
    ...closed(noHover, theme),
    '& .MuiDrawer-paper': closed(noHover, theme),
  }),
}));

export default PermanentComponent;
