import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from 'assets/nu-apc.png';
import { useAuth } from 'contexts/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.spacing(50),
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

  const isMounted = useRef(true);

  const styles = useStyles();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
      <div className='background'>
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <img alt='NU-APC' src={logo} />
              <Typography sx={{ textAlign: 'center' }} variant='h5'>
                APC Identification System
              </Typography>
              <Typography sx={{ textAlign: 'center' }} variant='body1'>
                Login with <span className={styles.office}>Office 365</span>{' '}
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
          </Stack>

          <LoadingButton loading={loading} type='submit' variant='contained'>
            Login
          </LoadingButton>
        </Stack>
      </form>
      </div>
    </div>
  );
};

export default LoginComponent;
