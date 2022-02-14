import { Drawer } from '@mui/material';
import { styled } from '@mui/system';

const PersistentComponent = styled(Drawer)(({ theme }) => ({
  width: theme.spacing(30),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.spacing(30),
    boxSizing: 'border-box',
  },
}));

export default PersistentComponent;
