//import Webcam from "react-webcam";
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const Input = styled('input')({
  display: 'none',
});

const IDFormComponent = () => {
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const dataRef = await getDoc(userDocumentRef);
        setData(dataRef.data());
        setLoading(false);
      } catch (e) {
        if (!isMounted.current) return;

        setError(e.message);
        setLoading(false);
      }
    };

    getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant='h6'>ID System Form</Typography>
            {error && <Alert severity='error'>{error}</Alert>}
          </Stack>
          <Stack spacing={3}>
            <TextField
              id='name-input'
              disabled
              name='name'
              label='Name'
              type='text'
              variant='filled'
              value={loading ? '' : `${data.name?.first} ${data.name?.last}`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress size={25} />}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

            <TextField
              id='idnumber-input'
              disabled
              name='idnumber'
              label='ID number'
              type='text'
              variant='filled'
              value={data.idNumber}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress size={25} />}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

            <TextField
              id='course-input'
              disabled
              name='course'
              label='Course'
              type='text'
              variant='filled'
              value={data.course?.abbreviation}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress size={25} />}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

            <TextField
              id='nickname-input'
              disabled
              name='Nickname'
              label='Nickname'
              type='text'
              variant='filled'
              value={data.name?.nick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress size={25} />}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

            <label htmlFor='id-photo'>
              <Input accept='image/*' id='id-photo' type='file' />
              <Button
                disabled={loading}
                variant='contained'
                component='span'
                fullWidth
              >
                Upload ID Picture
              </Button>
            </label>

            <label htmlFor='signature'>
              <Input accept='image/*' id='signature' type='file' />
              <Button
                disabled={loading}
                variant='contained'
                component='span'
                fullWidth
              >
                Upload E-Signature
              </Button>
            </label>
          </Stack>

          <LoadingButton loading={loading} type='submit' variant='contained'>
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default IDFormComponent;
