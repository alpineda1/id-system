import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { pages, utils } from 'components/layout';
import IconComponent from 'components/utils/icon';
import { useAuth } from 'contexts/auth';
import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ToolbarComponent from '../toolbar';
import ItemComponent from './item';

const randomWidths = [
  Math.floor(Math.random() * (100 - 70) + 70),
  Math.floor(Math.random() * (100 - 70) + 70),
  Math.floor(Math.random() * (100 - 70) + 70),
];

const ContentComponent = ({
  handleDrawerClose = () => {},
  handleToggleDrawer,
}) => {
  const {
    loading,
    currentUserRolesLoading,
    currentUserRoles,
    hasID,
    hasIDLoading,
  } = useAuth();

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

      {!loading && !currentUserRolesLoading && !hasIDLoading ? (
        <List>
          {pages &&
            pages
              .filter((p) => (hasID ? p : !p.hasID))
              .filter((p) =>
                currentUserRolesLoading
                  ? p
                  : p.roles.some((r) => currentUserRoles.includes(r)),
              )
              .map(({ text, route, icon, end = false }, index) => (
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
      ) : (
        <List>
          {[0, 1, 3].map((n, index) => (
            <ItemComponent key={index}>
              <ListItemIcon>
                <Skeleton variant='circular' width={24} height={24} />
              </ListItemIcon>
              <ListItemText>
                <Skeleton
                  sx={{
                    height: '100%',
                    width: `${randomWidths[n]}%`,
                  }}
                />
              </ListItemText>
            </ItemComponent>
          ))}
        </List>
      )}
    </Fragment>
  );
};

export default ContentComponent;
