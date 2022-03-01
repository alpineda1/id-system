import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import APCLogo from 'assets/apc-business.png';
import NUAPCLogo from 'assets/nu-apc.png';
import registrarSignature from 'assets/registrar-e-sign.png';
import LoadingComponent from 'components/utils/loading';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    borderRight: ['1px solid', theme?.palette?.secondary?.dark].join(' '),
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
    width: theme.spacing(12),
    height: 'auto',
    paddingTop: theme.spacing(2),
  },
  cardFullname: {
    fontSize: '1.2em !important',
    fontWeight: '600 !important',
    textAlign: 'center',
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
  signatureContainer: {
    position: 'relative',
    width: '60%',
  },
  signature: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: theme.spacing(-4),
  },
  apcTitle: {
    fontSize: '1.2em !important',
    fontWeight: '500 !important',
  },
  apcDetails: {
    fontWeight: '500 !important',
  },
  NUAPCLogo: {
    width: '25%',
    height: 'auto',
  },
}));

const StudentIDPreviewComponent = () => {
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
  const [accountData, setAccountData] = useState({
    idNumber: '',
    course: '',
    strand: '',
    level: '',
  });
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();

  const { open } = useSnackbar();
  const theme = useTheme();
  const { uid, id } = useParams();

  useEffect(() => {
    isMounted.current = true;

    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', uid);
        const userAccountDocumentRef = doc(userDocumentRef, 'accounts', id);

        const dataRef = await getDoc(userDocumentRef);
        const accountDataRef = await getDoc(userAccountDocumentRef);

        const localData = dataRef.data();
        const localAccountData = accountDataRef.data();

        if (!isMounted.current) return;

        setData(localData);
        setAccountData(localAccountData);

        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    getUserData();

    return () => (isMounted.current = false);
  }, [id, open, uid]);

  return (
    <Container maxWidth='sm' sx={{ width: '600px' }}>
      <Stack spacing={4}>
        <div className={classes.cardContainer}>
          <div className={classes.cardContent}>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                {accountData?.photoURL && (
                  <div className={classes.cardPhotoContainer}>
                    <img
                      className={classes.cardPhoto}
                      src={accountData.photoURL || ''}
                      alt='Identification'
                    />
                  </div>
                )}

                <div className={classes.cardDetails}>
                  <Stack className={classes.centerStack} spacing={3}>
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
                            {data?.name?.first} {data?.name?.middle}
                            {data?.name?.middle?.length === 1 && '.'}{' '}
                            {data?.name?.last}
                          </Typography>

                          <Typography
                            className={classes.cardNickname}
                            variant='h4'
                          >
                            {data?.name?.nick}
                          </Typography>
                        </Stack>

                        <div className={classes.idNumber}>
                          {accountData?.idNumber}
                        </div>
                      </Stack>

                      <div className={classes.course}>
                        {accountData?.course}
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
            {loading ? (
              <LoadingComponent />
            ) : (
              <Stack
                className={classes.centerStack}
                sx={{ width: '100%', paddingTop: theme.spacing(5) }}
                spacing={4}
              >
                <Grid
                  container
                  sx={{ padding: [0, theme.spacing(7)].join(' ') }}
                  spacing={6}
                >
                  <Grid item xs={6}>
                    <Stack spacing={2} className={classes.centerStack}>
                      <div className={classes.signatureContainer}>
                        {accountData?.signatureURL && (
                          <img
                            className={classes.signature}
                            src={accountData?.signatureURL}
                            alt='Student signature'
                          />
                        )}
                      </div>

                      <Divider sx={{ width: '100%', zIndex: 1 }} />

                      <Stack spacing={0.5} className={classes.centerStack}>
                        <Typography variant='body2'>
                          {data?.name?.first} {data?.name?.middle}
                          {data?.name?.middle?.length === 1 && '.'}{' '}
                          {data?.name?.last}
                        </Typography>

                        <Typography variant='body2'>Student</Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack
                      spacing={2}
                      className={classes.centerStack}
                      sx={{ zIndex: 1 }}
                    >
                      <div className={classes.signatureContainer}>
                        <img
                          className={classes.signature}
                          src={registrarSignature}
                          alt='Student signature'
                        />
                      </div>

                      <Divider sx={{ width: '100%' }} />

                      <Stack spacing={0.5} className={classes.centerStack}>
                        <Typography variant='body2'>
                          Stanley Glenn E. Brucal
                        </Typography>

                        <Typography variant='body2'>Registrar</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Stack spacing={3} className={classes.centerStack}>
                  <Stack spacing={0.5} className={classes.centerStack}>
                    <Typography variant='body1' className={classes.apcTitle}>
                      ASIA PACIFIC COLLEGE
                    </Typography>
                    <Typography variant='body2' className={classes.apcDetails}>
                      3 Humabon Place, Magallanes, Makati City, 1232 PH
                    </Typography>
                    <Typography variant='body2' className={classes.apcDetails}>
                      www.apc.edu.ph • 8852-9232
                    </Typography>
                  </Stack>

                  <img
                    className={classes.NUAPCLogo}
                    src={NUAPCLogo}
                    alt='NU-APC logo'
                  />
                </Stack>
              </Stack>
            )}
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default StudentIDPreviewComponent;
