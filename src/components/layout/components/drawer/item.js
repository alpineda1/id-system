import { ListItemButton } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ItemStyledComponent = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  '.is-active &': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const ItemComponent = ({ children }) => {
  return <ItemStyledComponent>{children}</ItemStyledComponent>;
};

export default ItemComponent;
