import { LoadingButton } from '@mui/lab';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from 'assets/nu-apc.png';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.spacing(50),
  },
}));

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [levelOfEducation, setLevelOfEducation] = useState('');

  const firstnameRef = useRef();
  const middlenameRef = useRef();
  const lastnameRef = useRef();
  const nicknameRef = useRef();
  const idNumberRef = useRef();
  const courseRef = useRef();

  const isMounted = useRef(true);

  const styles = useStyles();
  const { register } = useAuth();
  const navigate = useNavigate();
  const { open } = useSnackbar();

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

    const data = {
      roles: ['user'],
      name: {
        first: firstnameRef?.current?.value,
        middle: middlenameRef?.current?.value || '',
        last: lastnameRef?.current?.value || '',
        nick: nicknameRef?.current?.value || '',
      },
    };

    const accountData = {
      course: courseRef?.current?.value || '',
      level: levelOfEducation,
      idNumber: idNumberRef?.current?.value || '',
    };

    try {
      setError('');
      setLoading(true);

      const { user } = await register(email, password);
      const docRef = doc(db, 'users', user.uid);
      const accountCollectionRef = collection(docRef, 'accounts');

      await setDoc(docRef, { ...data, createdAt: serverTimestamp() });
      await addDoc(accountCollectionRef, {
        ...accountData,
        createdAt: serverTimestamp(),
      });

      navigate('/');
    } catch (e) {
      open(e.message, 'error');

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
                This registration page is for simulation purposes only
              </Typography>
            </Stack>

            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              autoComplete='given-name'
              disabled={loading}
              label='First name'
              inputRef={firstnameRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='additional-name'
              disabled={loading}
              label='Middle name'
              inputRef={middlenameRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='family-name'
              disabled={loading}
              label='Last name'
              inputRef={lastnameRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='nickname'
              disabled={loading}
              label='Nick name'
              inputRef={nicknameRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='on'
              disabled={loading}
              label='ID'
              inputRef={idNumberRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <FormControl variant='filled' fullWidth>
              <InputLabel id='level-of-education-label'>
                Level of Education
              </InputLabel>
              <Select
                labelId='level-of-education-label'
                id='level-of-education'
                value={levelOfEducation}
                onChange={(e) => setLevelOfEducation(e.target.value)}
                disableUnderline
              >
                <MenuItem value='Senior High School'>
                  Senior High School
                </MenuItem>
                <MenuItem value='College'>College</MenuItem>
              </Select>
            </FormControl>

            <TextField
              autoComplete='on'
              disabled={loading}
              label={
                levelOfEducation === 'Senior High School' ? 'Strand' : 'Course'
              }
              inputRef={courseRef}
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

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

          <LoadingButton loading={loading} type='submit' variant='contained'>
            Create account
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default SignUpComponent;
