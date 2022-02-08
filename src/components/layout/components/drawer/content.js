import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import IconComponent from 'components/utils/icon';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ToolbarComponent from '../toolbar';
import ItemComponent from './item';

const pages = [];
const utils = [];

const ContentComponent = ({
  handleDrawerClose = () => {},
  handleToggleDrawer,
}) => {
  return (
    <Fragment>
      <ToolbarComponent>
        <IconButton onClick={handleToggleDrawer}>
          <IconComponent icon='list' iconType='phosphor' weight='regular' />
        </IconButton>
        <Typography variant='h6' sx={{ pl: 3 }} noWrap component='div'>
          ID System
        </Typography>
      </ToolbarComponent>
      <List>
        {pages &&
          pages.map(({ text, route, icon, end }, index) => (
            <NavLink
              activeClassName='is-active'
              key={index}
              onClick={handleDrawerClose}
              to={route}
              id={route}
              end={end}
            >
              <ItemComponent>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} />
              </ItemComponent>
            </NavLink>
          ))}
        <Divider />
        {utils &&
          utils.map(({ text, route, icon, end }, index) => (
            <NavLink
              activeClassName='is-active'
              key={index}
              onClick={handleDrawerClose}
              to={route}
              id={route}
              end={end}
            >
              <ItemComponent>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} />
              </ItemComponent>
            </NavLink>
          ))}
      </List>
    </Fragment>
  );
};

export default ContentComponent;
