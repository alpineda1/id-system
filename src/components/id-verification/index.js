import { LoadingButton } from '@mui/lab';
import { Alert, Container, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';

const IdVerificationComponent = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const idRef = useRef();
  const isMounted = useRef(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userDocumentRef = doc(db, 'users', currentUser.uid);
      const dataRef = await getDoc(userDocumentRef);
      const { idNumber } = dataRef.data();

      if (idNumber !== idRef.current.value) {
        setLoading(false);
        setError('ID Number is incorrect');
        return;
      }
    } catch (e) {
      if (!isMounted.current) return;

      setLoading(false);
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant='h6' textAlign='center'>
              Enter your official APC ID Number for verification
            </Typography>

            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              disabled={loading}
              label='ID Number'
              variant='filled'
              inputRef={idRef}
              onChange={() => error && setError('')}
              InputProps={{ disableUnderline: true }}
            />
          </Stack>
          <LoadingButton loading={loading} type='submit' variant='contained'>
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default IdVerificationComponent;
