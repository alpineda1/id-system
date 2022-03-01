import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import IconComponent from 'components/utils/icon';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  background: theme.palette.primary.light,
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

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
  },
  divider: {
    margin: [theme.spacing(1), 0].join(' '),
  },
  popover: {
    margin: [theme.spacing(1), 0].join(' '),
  },
}));

const NavbarComponent = ({ drawerOpen, handleDrawerOpen, noHover }) => {
  const [onTop, setOnTop] = useState(true);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [popoverElement, setPopoverElement] = useState(() => {});

  const isMounted = useRef(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    isMounted.current = true;

    const getUserData = async () => {
      const userDocumentRef = doc(db, 'users', currentUser.uid);
      const dataRef = await getDoc(userDocumentRef);

      if (!isMounted.current) return;

      setData(dataRef?.data());
      setLoading(false);
    };

    if (!!currentUser.uid) getUserData();

    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentUser.uid]);

  const handlePopoverOpen = (e) => {
    setPopoverElement(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverElement(() => {});
  };

  const handleScroll = () => {
    if (window.scrollY >= 25) setOnTop(false);
    else setOnTop(true);
  };

  const handleLogout = () => {
    try {
      logout();
      navigate('/login');
    } catch (e) {
      console.error(e.message);
    }
  };

  const open = Boolean(popoverElement);

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
          {loading ? (
            <Skeleton variant='circular' width={40} height={40} />
          ) : (
            <div>
              <Avatar
                aria-owns={open ? 'account-popover' : undefined}
                aria-haspopup='true'
                className={classes.avatar}
                onClick={handlePopoverOpen}
              >
                {data?.name?.first[0]}
              </Avatar>

              <Popover
                id='account-popover'
                className={classes.popover}
                anchorEl={popoverElement || null}
                open={open}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={handlePopoverClose}
              >
                <List>
                  <ListItem alignItems='flex-start'>
                    <ListItemText>
                      <Typography variant='h6' gutterBottom>
                        {data?.name?.first} {data?.name?.last}
                      </Typography>
                    </ListItemText>
                  </ListItem>

                  <Divider className={classes.divider} />

                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <IconComponent icon='sign-out' />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </ListItemButton>
                </List>
              </Popover>
            </div>
          )}
        </Stack>
      </ToolbarStyledComponent>
    </AppBarStyledComponent>
  );
};

export default NavbarComponent;
