import { Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ToolbarStyledComponent = styled(Toolbar)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const ToolbarComponent = ({ children }) => {
  return <ToolbarStyledComponent>{children}</ToolbarStyledComponent>;
};

export default ToolbarComponent;
