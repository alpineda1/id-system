import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from 'assets/nu-apc.png';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.spacing(50),
  },
  submit: {
    padding: [theme.spacing(1.5), theme.spacing(2)].join(' '),
  },
  office: {
    fontWeight: 600,
    color: '#DC3E15',
  },
}));

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);

  const styles = useStyles();
  const { register } = useAuth();
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

  const handleConfirmPasswordChange = (e) => {
    setError('');
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const { user } = await register(email, password);

      console.log(user.uid);
      await setDoc(doc(db, 'users', user.uid), { roles: ['user'] });

      navigate('/');
    } catch (e) {
      console.error(e);
      if (!isMounted.current) return;

      setError(e.message);
      setLoading(false);
    }
  };

  return (
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
              autoComplete='new-password'
              disabled={loading}
              label='Password'
              onChange={handlePasswordChange}
              type='password'
              value={password}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='new-password'
              disabled={loading}
              label='Confirm Password'
              onChange={handleConfirmPasswordChange}
              type='password'
              value={confirmPassword}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />
          </Stack>

          <LoadingButton
            loading={loading}
            type='submit'
            className={styles.submit}
            variant='contained'
          >
            Create account
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default SignUpComponent;
