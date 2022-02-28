import { ListItemButton as MaterialListItemButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import React, { forwardRef } from 'react';

export const useStyles = makeStyles((theme) => ({
  itemMainContainer: {
    width: '100%',
  },
}));

const ListItemButton = styled(MaterialListItemButton)(({ theme }) => ({
  width: '100%',
  padding: [theme.spacing(3), theme.spacing(4)].join(' '),
  borderRadius: theme.spacing(1.5),
  border: ['1px solid', theme.palette.divider].join(' '),
  marginBottom: theme.spacing(4),
}));

const ItemComponent = forwardRef(({ data, index, classes }, ref) => {
  console.log(classes);

  return (
    <ListItemButton key={index} ref={ref}>
      {data}
    </ListItemButton>
  );
});

export default ItemComponent;
