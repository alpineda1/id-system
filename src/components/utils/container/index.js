import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from 'contexts/auth';

const StyledComponent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'layout' && prop !== 'fullscreen',
})(({ fullscreen, layout, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: [theme.spacing(4), theme.spacing(2)].join(' '),
  minHeight: !fullscreen
    ? 'initial'
    : layout
    ? `calc(100vh - ${theme.spacing(12)})`
    : '100vh',
  [theme.breakpoints.up('md')]: {
    minHeight: !fullscreen
      ? 'initial'
      : layout
      ? `calc(100vh - ${theme.spacing(13)})`
      : '100vh',
  },
}));

const ContainerComponent = ({ children, fullscreen }) => {
  const { currentUser } = useAuth();

  return (
    <StyledComponent fullscreen={fullscreen} layout={currentUser}>
      {children}
    </StyledComponent>
  );
};

export default ContainerComponent;
