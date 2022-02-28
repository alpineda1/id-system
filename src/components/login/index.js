import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import background from 'assets/apc-building.jpg';
import logo from 'assets/nu-apc.png';
import { useAuth } from 'contexts/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { app } from 'firebase.app';
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  backgroundOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1,
  },
  background: {
    flex: 1,
    objectFit: 'cover',
    objectPosition: 'center',
    minWidth: '100%',
    minHeight: '100%',
  },
  container: {
    width: '100%',
    maxWidth: theme.spacing(56),
    padding: [theme.spacing(4), theme.spacing(3)].join(' '),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1.5),
    border: ['1px solid', theme.palette.divider].join(' '),
  },
  office: {
    fontWeight: 600,
    color: '#DC3E15',
  },
}));

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isMounted = useRef(true);

  const classes = useStyles();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  const handleEmailChange = (e) => {
    setError('');
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError('');
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      setError('');
      setLoading(true);

      await login(email, password);

      navigate('/');
    } catch (e) {
      if (!isMounted.current) return;

      setError(e.message);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };
  return (
    <>
      <div className={classes.backgroundContainer}>
        <img
          className={classes.background}
          src={background}
          alt='APC Building'
        />
      </div>

      <div
        className={`${classes.backgroundContainer} ${classes.backgroundOverlay}`}
      />

      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <img alt='NU-APC' src={logo} />
                <Typography sx={{ textAlign: 'center' }} variant='h5'>
                  APC Identification System
                </Typography>
                <Typography sx={{ textAlign: 'center' }} variant='body1'>
                  Login with <span className={classes.office}>Office 365</span>{' '}
                  Account
                </Typography>
              </Stack>

              {error && <Alert severity='error'>{error}</Alert>}

              <TextField
                autoComplete='email'
                disabled={loading}
                label='Email'
                onChange={handleEmailChange}
                type='email'
                value={email}
                variant='filled'
                InputProps={{ disableUnderline: true }}
              />
              <p className="errorMsg">{emailError}</p>

              <TextField
                autoComplete='current-password'
                disabled={loading}
                label='Password'
                onChange={handlePasswordChange}
                type='password'
                value={password}
                variant='filled'
                InputProps={{ disableUnderline: true }}
              />
              <p className="errorMsg">{passwordError}</p>
            </Stack>

            <LoadingButton loading={loading} type='submit' variant='contained' onClick={handleLogin}>
              Login
            </LoadingButton>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
