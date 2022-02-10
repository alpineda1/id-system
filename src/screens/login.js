import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import LoginComponent from 'components/login';
import { useAuth } from 'contexts/auth';
import React from 'react';

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'layout',
})(({ layout, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: [theme.spacing(4), 0].join(' '),
  minHeight: layout ? `calc(100vh - ${theme.spacing(12)})` : '100vh',
  [theme.breakpoints.up('md')]: {
    minHeight: layout ? `calc(100vh - ${theme.spacing(13)})` : '100vh',
  },
}));

const LoginScreen = () => {
  const { user } = useAuth();

  return (
    <StyledContainer layout={user?.currentUser}>
      <LoginComponent />
    </StyledContainer>
  );
};

export default LoginScreen;
