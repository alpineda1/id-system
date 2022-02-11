import { LoadingButton } from '@mui/lab';
import { Alert, Container, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';

const IdVerificationComponent = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const idRef = useRef();

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userDocumentRef = doc(db, 'users', currentUser.uid);
    const dataRef = await getDoc(userDocumentRef);
    const { idNumber } = dataRef.data();

    if (idNumber !== idRef.current.value) {
      setLoading(false);
      setError('ID Number is incorrect');
      return;
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
