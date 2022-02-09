import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        m: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
