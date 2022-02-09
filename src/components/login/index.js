import { Button, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from 'assets/nu-apc.png';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: theme.spacing(50),
  },
  submit: {
    padding: [theme.spacing(1.5), theme.spacing(2)].join(' '),
  },
}));

const LoginComponent = () => {
  const styles = useStyles();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin}>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <img alt='NU-APC' src={logo} />

            <TextField
              autoComplete='email'
              label='Email'
              type='email'
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              autoComplete='current-password'
              label='Password'
              type='password'
              variant='filled'
              InputProps={{ disableUnderline: true }}
            />
          </Stack>

          <Button type='submit' className={styles.submit} variant='contained'>
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginComponent;
