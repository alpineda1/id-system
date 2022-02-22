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
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { useAuth } from 'contexts/auth';
import { db, storage } from 'firebase.app';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'file',
})(({ file, theme }) => ({
  borderRadius: theme.spacing(1.5),
  ...(file && {
    borderRadius: [0, 0, theme.spacing(1.5), theme.spacing(1.5)].join(' '),
  }),
}));

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: [theme.spacing(1.5), theme.spacing(1.5), 0, 0].join(' '),
  },
}));

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
  const [idFile, setIdFile] = useState('');
  const [signatureFile, setSignatureFile] = useState('');
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();
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

  const handlePhotoUpload = (e) => {
    const file = e.target?.files?.[0];
    setIdFile({ file, url: URL.createObjectURL(file) });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target?.files?.[0];
    setSignatureFile({ file, url: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const photoStorageRef = ref(
        storage,
        `/users/photo/${currentUser.uid}.${idFile.file.name.split('.')[1]}`,
      );
      const signatureStorageRef = ref(
        storage,
        `users/signature/${currentUser.uid}.${
          signatureFile.file.name.split('.')[1]
        }`,
      );

      const uploadFiles = async (photoRef, signatureRef) => {
        const photo = await uploadBytes(photoRef, idFile.file);
        const signature = await uploadBytes(signatureRef, signatureFile.file);

        return Promise.all([photo, signature]);
      };

      await uploadFiles(photoStorageRef, signatureStorageRef);

      const getDownloadFiles = async (photoRef, signatureRef) => {
        const photo = await getDownloadURL(photoRef);
        const signature = await getDownloadURL(signatureRef);

        return Promise.all([photo, signature]);
      };

      const [photoURL, signatureURL] = await getDownloadFiles(
        photoStorageRef,
        signatureStorageRef,
      );

      await updateDoc(doc(db, 'users', currentUser.uid), {
        photoURL,
        signatureURL,
      });
    } catch (e) {
      if (!isMounted.current) return;

      setError(e.message);
      setLoading(false);
    }

    setLoading(false);
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
              label='Last Name'
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
              id='name-input'
              disabled
              name='name'
              label='Middle Name'
              type='text'
              variant='filled'
              value={loading ? '' : `${data.name?.middle} `}
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
              id='name-input'
              disabled
              name='name'
              label='First Name'
              type='text'
              variant='filled' 
              value={loading ? '' : `${data.name?.first} `}
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
              pattern="[a-zA-Z]*"
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

            <Stack>
              {idFile.url && (
                <img className={classes.image} src={idFile.url} alt='Random' />
              )}

              <label htmlFor='id-photo'>
                <Input
                  accept='image/*'
                  id='id-photo'
                  type='file'
                  onChange={handlePhotoUpload}
                />
                <StyledButton
                  disabled={loading}
                  file={idFile}
                  variant='contained'
                  component='span'
                  fullWidth
                >
                  Upload ID Picture
                </StyledButton>
              </label>
            </Stack>

            <Stack>
              {signatureFile.url && (
                <img
                  className={classes.image}
                  src={signatureFile.url}
                  alt='Random'
                />
              )}

              <label htmlFor='signature'>
                <Input
                  accept='image/*'
                  id='signature'
                  type='file'
                  onChange={handleSignatureUpload}
                />
                <StyledButton
                  disabled={loading}
                  file={signatureFile}
                  variant='contained'
                  component='span'
                  fullWidth
                >
                  Upload E-Signature
                </StyledButton>
              </label>
            </Stack>
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
