import { Container, Grid, Stack, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import APCLogo from 'assets/apc-business.jpg';
import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    borderRadius: theme.spacing(1.5),
    outline: ['1px solid', theme.palette.divider].join(' '),
    height: 0,
    paddingTop: '63%',
    position: 'relative',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  centerStack: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPhotoContainer: {
    flex: 9,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
  },
  cardPhoto: {
    flex: 1,
    objectFit: 'cover',
    objectPosition: 'center',
    minWidth: '100%',
    minHeight: '100%',
  },
  cardDetails: {
    flex: 11,
    width: '55%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme?.palette?.secondary?.main,
  },
  cardDetailsLogo: {
    width: theme.spacing(10),
    height: 'auto',
  },
  cardFullname: {
    fontSize: '1.1em !important',
    fontWeight: '600 !important',
    padding: [0, theme.spacing(5)].join(' '),
  },
  cardNickname: {
    textTransform: 'uppercase',
  },
  idNumber: {
    width: '100%',
    backgroundColor: theme?.palette?.primary?.main,
    color: theme?.palette?.primary?.contrastText,
    textAlign: 'center',
    fontWeight: 700,
    padding: theme.spacing(1),
  },
  course: {
    textAlign: 'center',
    fontWeight: 600,
  },
  cardBack: {},
}));

const IDPreviewComponent = () => {
  const [data, setData] = useState({
    name: {
      first: '',
      last: '',
      middle: '',
      nick: '',
    },
    course: {
      abbreviation: '',
    },
    idNumber: '',
  });
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();

  const { currentUser } = useAuth();
  const { open } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const dataRef = await getDoc(userDocumentRef);
        const data = dataRef.data();
        setData(data);

        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    if (!!currentUser.uid) getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid, open]);

  return (
    <Container maxWidth='sm' sx={{ width: '600px' }}>
      <Stack spacing={4}>
        <div className={classes.cardContainer}>
          <div className={classes.cardContent}>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className={classes.cardPhotoContainer}>
                  <img
                    className={classes.cardPhoto}
                    src={data.photoURL || ''}
                    alt='Identification'
                  />
                </div>
                <div className={classes.cardDetails}>
                  <Stack className={classes.centerStack} spacing={5}>
                    <img
                      className={classes.cardDetailsLogo}
                      src={APCLogo}
                      alt='Asia Pacific College logo'
                    />

                    <Stack className={classes.centerStack} spacing={2}>
                      <Stack className={classes.centerStack} spacing={2}>
                        <Stack className={classes.centerStack} spacing={1}>
                          <Typography
                            className={classes.cardFullname}
                            variant='body1'
                          >
                            {data?.name?.first}{' '}
                            {data?.name?.middle && `${data?.name?.middle}.`}{' '}
                            {data?.name?.last}
                          </Typography>

                          <Typography
                            className={classes.cardNickname}
                            variant='h4'
                          >
                            {data?.name?.nick}
                          </Typography>
                        </Stack>

                        <div className={classes.idNumber}>{data?.idNumber}</div>
                      </Stack>

                      <div className={classes.course}>
                        {data?.course?.abbreviation}
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={classes.cardContainer}>
          <div className={classes.cardContent}>
            <Stack
              className={classes.centerStack}
              sx={{ width: '100%' }}
              spacing={3}
            >
              <Grid
                container
                sx={{ padding: [0, theme.spacing(4)].join(' ') }}
                spacing={2}
              >
                <Grid item xs={6}>
                  <Stack spacing={1} className={classes.centerStack}>
                    <Typography variant='body2'>
                      {data?.name?.first}{' '}
                      {data?.name?.middle && `${data?.name?.middle}.`}{' '}
                      {data?.name?.last}
                    </Typography>

                    <Typography variant='body2'>Student</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={1} className={classes.centerStack}>
                    <Typography variant='body2'>
                      Stanley Glenn Brucal
                    </Typography>

                    <Typography variant='body2'>Registrar</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default IDPreviewComponent;
