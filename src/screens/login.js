import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import LoginComponent from 'components/login';
import { useState } from 'react';

const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'layout',
})(({ layout, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: [theme.spacing(4), 0].join(' '),
  minHeight: `calc(100vh - ${layout ? theme.spacing(12) : 0})`,
  [theme.breakpoints.up('md')]: {
    minHeight: `calc(100vh - ${layout ? theme.spacing(13) : 0})`,
  },
}));

const LoginScreen = () => {
  const [auth] = useState(true);

  return (
    <StyledContainer layout={auth}>
      <LoginComponent />
    </StyledContainer>
  );
};

export default LoginScreen;
