import { Skeleton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
  itemContainer: {
    width: '100%',
    padding: [theme.spacing(3), theme.spacing(4)].join(' '),
    borderRadius: theme.spacing(1.5),
    border: ['1px solid', theme.palette.divider].join(' '),
    marginBottom: theme.spacing(4),
  },
}));

const randomWidth = (min, max) => Math.floor(Math.random() * (max - min) + min);

const LoadingComponent = () => {
  const classes = useStyles();

  return (
    <Stack>
      {[0, 1, 2, 3].map((_, index) => (
        <div className={classes.itemContainer} key={index}>
          <Stack spacing={2}>
            <Skeleton height={50} width={`${randomWidth(50, 80)}%`} />

            <Stack>
              <Skeleton width={`${randomWidth(40, 60)}%`} />
              <Skeleton width={`${randomWidth(40, 60)}%`} />
            </Stack>
          </Stack>
        </div>
      ))}
    </Stack>
  );
};

export default LoadingComponent;
