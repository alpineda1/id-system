import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/system';
import React, { forwardRef } from 'react';

export const useStyles = makeStyles((theme) => ({
  itemMainContainer: {
    width: '100%',
    ...{
      '& > div': {
        width: '100% !important',
        ...{
          '& > div > div': {
            width: '100% !important',
            ...{
              '& > div': {
                width: '100% !important',
                maxWidth: 'initial !important',
              },
            },
          },
        },
      },
    },
  },
  itemWrapper: {
    width: '100%',
    paddingBottom: theme.spacing(4),
  },
  itemContainer: {
    width: '100%',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ListItem = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: [theme.spacing(3), theme.spacing(4)].join(' '),
  borderRadius: theme.spacing(1.5),
  border: ['1px solid', theme.palette.divider].join(' '),
}));

const ItemComponent = forwardRef(({ data, index, classes }, ref) => {
  const theme = useTheme();

  const lgAbove = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div className={classes.itemWrapper} key={index} ref={ref}>
      <ListItem>
        <Stack spacing={2} className={classes.itemContainer}>
          {data.reason && (
            <Typography variant='body1'>{data.reason}</Typography>
          )}

          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              className={classes.gridItem}
              sx={{ marginBottom: !lgAbove && theme.spacing(2) }}
            >
              <Stack>
                <Typography variant='h6'>
                  {data?.name?.first} {data?.name?.last}
                </Typography>
                <Typography variant='body1'>{data?.idNumber}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={6} className={classes.gridItem}>
              <Stack>
                <Typography variant='body2'>{data?.level}</Typography>
                <Typography variant='body2'>{data?.course}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </ListItem>
    </div>
  );
});

export default ItemComponent;
