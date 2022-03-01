import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

const EmptyListComponent = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: [theme.spacing(2), theme.spacing(3)].join(' ') }}>
      <Typography sx={{ textAlign: 'center' }}>The list is empty</Typography>
    </Box>
  );
};

export default EmptyListComponent;
