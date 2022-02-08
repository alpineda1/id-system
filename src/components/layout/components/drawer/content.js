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

const pages = [
  {
    text: 'Home',
    route: '/',
    icon: 'compass',
    end: true,
  },
];

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
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              key={index}
              onClick={handleDrawerClose}
              to={route}
              id={route}
              end={end}
            >
              <ItemComponent>
                <ListItemIcon>
                  <IconComponent icon={icon} weight='regular' />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ItemComponent>
            </NavLink>
          ))}
        {utils && <Divider sx={{ my: 1 }} />}
        {utils &&
          utils.map(({ text, route, icon, end }, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              key={index}
              onClick={handleDrawerClose}
              to={route}
              id={route}
              end={end}
            >
              <ItemComponent>
                <ListItemIcon>
                  <IconComponent icon={icon} weight='regular' />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ItemComponent>
            </NavLink>
          ))}
      </List>
    </Fragment>
  );
};

export default ContentComponent;
