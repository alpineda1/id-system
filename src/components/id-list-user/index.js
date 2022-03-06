import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardItem: {
    borderRadius: theme.spacing(1.5),
    outline: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
  },
  cardText: {
    padding: [theme.spacing(3), theme.spacing(4)].join(' '),
  },
  photoContainer: {
    width: theme.spacing(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRight: ['1px solid', theme.palette.divider].join(' '),
  },
  photo: {
    flex: 1,
    objectFit: 'cover',
    objectPosition: 'center',
    minWidth: '100%',
    minHeight: '100%',
  },
}));

const IDListUserComponent = ({
  userAccounts,
  prefix = 'form',
  disabledItem = {},
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <Stack spacing={3}>
        <Stack spacing={3}>
          <Typography variant='h3'>Identifications</Typography>
          <Typography variant='body1'>
            Please select currently used identification number
          </Typography>
        </Stack>

        <List>
          {userAccounts.length > 0 &&
            userAccounts.map(
              ({ course, idNumber, level, photoURL, strand }, index) =>
                Object.keys(disabledItem)?.length > 0 &&
                userAccounts[index][disabledItem?.param] ===
                  disabledItem?.value ? (
                  <ListItem
                    key={index}
                    sx={{
                      padding: 0,
                      margin: [theme.spacing(3), 0].join(' '),
                      borderRadius: theme.spacing(1.5),
                    }}
                  >
                    <Box className={classes.cardItem} sx={{ width: '100%' }}>
                      {photoURL && (
                        <div className={classes.photoContainer}>
                          <img
                            className={classes.photo}
                            src={photoURL}
                            alt='Identification'
                          />
                        </div>
                      )}

                      <ListItemText className={classes.cardText}>
                        <Typography variant='h5' gutterBottom>
                          {idNumber}
                        </Typography>
                        <Typography variant='body1'>{level}</Typography>
                        <Typography variant='body1'>
                          {course || strand}
                        </Typography>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ) : (
                  <Link to={`/${prefix}/${idNumber}`} key={index}>
                    <ListItemButton
                      sx={{
                        padding: 0,
                        margin: [theme.spacing(3), 0].join(' '),
                        borderRadius: theme.spacing(1.5),
                      }}
                    >
                      <Box className={classes.cardItem} sx={{ width: '100%' }}>
                        {photoURL && (
                          <div className={classes.photoContainer}>
                            <img
                              className={classes.photo}
                              src={photoURL}
                              alt='Identification'
                            />
                          </div>
                        )}

                        <ListItemText className={classes.cardText}>
                          <Typography variant='h5' gutterBottom>
                            {idNumber}
                          </Typography>
                          <Typography variant='body1'>{level}</Typography>
                          <Typography variant='body1'>
                            {course || strand}
                          </Typography>
                        </ListItemText>
                      </Box>
                    </ListItemButton>
                  </Link>
                ),
            )}
        </List>
      </Stack>
    </Container>
  );
};

export default IDListUserComponent;
