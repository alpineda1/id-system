import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { pages, utils } from 'components/layout';
import IconComponent from 'components/utils/icon';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ToolbarComponent from '../toolbar';
import ItemComponent from './item';

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
        <Link to='/'>
          <Typography variant='h6' sx={{ pl: 3 }} noWrap component='div'>
            ID System
          </Typography>
        </Link>
      </ToolbarComponent>
      <List>
        {pages &&
          pages.map(({ text, route, icon, end = false }, index) => (
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
          utils.map(({ text, route, icon, end = false }, index) => (
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
