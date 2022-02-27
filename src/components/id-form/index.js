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
import IconComponent from 'components/utils/icon';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db, storage } from 'firebase.app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UploadButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'file',
})(({ file, theme }) => ({
  borderRadius: theme.spacing(1.5),
  ...(file &&
    !file.del && {
      borderRadius: [0, 0, 0, theme.spacing(1.5)].join(' '),
    }),
}));

const RemoveButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'file',
})(({ file, theme }) => ({
  borderRadius: theme.spacing(1.5),
  ...(file && {
    borderRadius: [0, 0, theme.spacing(1.5), 0].join(' '),
  }),
}));

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: [theme.spacing(1.5), theme.spacing(1.5), 0, 0].join(' '),
  },
  label: {
    width: '100%',
  },
  uploadContainer: {
    borderRadius: theme.spacing(1.5),
    outline: '1px solid #dddddd',
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
  const [accountID, setAccountID] = useState('');
  const [accountData, setAccountData] = useState({
    idNumber: '',
    course: '',
    strand: '',
    level: '',
  });
  const [error, setError] = useState('');
  const [idFile, setIdFile] = useState('');
  const [signatureFile, setSignatureFile] = useState('');
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();
  const { currentUser } = useAuth();
  const { open } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const queryRef = query(
          collection(userDocumentRef, 'accounts'),
          where('idNumber', '==', id),
        );
        const dataRef = await getDoc(userDocumentRef);
        const querySnapshot = await getDocs(queryRef);
        const localData = dataRef.data();

        if (!isMounted.current) return;

        setData(localData);
        setAccountID(querySnapshot.docs[0].id);
        setAccountData(querySnapshot.docs[0].data());

        if (localData?.photoURL) setIdFile({ url: localData?.photoURL });
        if (localData?.signatureURL)
          setSignatureFile({ url: localData?.signatureURL });

        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setError(e.message);
        setLoading(false);
      }
    };

    if (!!currentUser.uid) getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid, id, open]);

  const handleNickChange = (e) => {
    setData((prev) => ({
      ...prev,
      name: { ...prev.name, nick: e.target.value },
    }));
  };

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
      const photoStorageRef = idFile?.file
        ? ref(
            storage,
            `/users/photo/${currentUser.uid}.${idFile.file.name.split('.')[1]}`,
          )
        : '';

      const signatureStorageRef = signatureFile?.file
        ? ref(
            storage,
            `users/signature/${currentUser.uid}.${
              signatureFile.file.name.split('.')[1]
            }`,
          )
        : '';

      if (!photoStorageRef && !idFile.url) {
        setError('ID Photo cannot be empty');
        setLoading(false);
        return;
      }

      if (!signatureStorageRef && !signatureFile.url) {
        setError('E-signature cannot be empty');
        setLoading(false);
        return;
      }

      const uploadFiles = async (photoRef, signatureRef) => {
        const photo = photoRef
          ? await uploadBytes(photoRef, idFile.file)
          : null;

        const signature = signatureRef
          ? await uploadBytes(signatureRef, signatureFile.file)
          : null;

        return Promise.all([photo, signature]);
      };

      await uploadFiles(photoStorageRef, signatureStorageRef);

      const getDownloadFiles = async (photoRef, signatureRef) => {
        const photo = idFile.del
          ? ''
          : photoRef
          ? await getDownloadURL(photoRef)
          : data?.photoURL
          ? data?.photoURL
          : '';

        const signature = signatureFile.del
          ? ''
          : signatureRef
          ? await getDownloadURL(signatureRef)
          : data?.signatureURL
          ? data?.signatureURL
          : '';

        return Promise.all([photo, signature]);
      };

      const [photoURL, signatureURL] = await getDownloadFiles(
        photoStorageRef,
        signatureStorageRef,
      );

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userAcccountDocRef = doc(userDocRef, 'accounts', accountID);

      await updateDoc(userDocRef, {
        name: data?.name,
        submittedAt: serverTimestamp(),
      });

      await updateDoc(userAcccountDocRef, {
        photoURL,
        signatureURL,
        submittedAt: serverTimestamp(),
      });

      const successMessage =
        !data?.photoURL || !data?.signatureURL
          ? 'Successfully uploaded images'
          : photoStorageRef && signatureStorageRef
          ? 'Successfully updated images'
          : 'Successfully updated fields';

      open(successMessage, 'success');

      navigate('/preview');
    } catch (e) {
      open(e.message, 'error');

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
            <Typography variant='h3'>ID Form</Typography>
            <Typography variant='body1'>
              Upload your <strong>identification photo</strong> and{' '}
              <strong>e-signature</strong>. Nickname could also be changed here.
            </Typography>
            {error && <Alert severity='error'>{error}</Alert>}
          </Stack>

          <Stack spacing={3}>
            <TextField
              id='name-input'
              disabled
              name='name'
              label='First Name'
              type='text'
              variant='filled'
              value={loading ? '' : data?.name?.first || ''}
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
              value={loading ? '' : data?.name?.middle || ''}
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
              label='Last Name'
              type='text'
              variant='filled'
              value={loading ? '' : data?.name?.last || ''}
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
              name='Nickname'
              label='Nickname'
              type='text'
              variant='filled'
              pattern='[a-zA-Z]*'
              value={loading ? '' : data?.name?.nick || ''}
              onChange={handleNickChange}
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
              value={loading ? '' : accountData?.idNumber || ''}
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
              id='level-input'
              disabled
              name='level'
              label='Level'
              type='text'
              variant='filled'
              value={loading ? '' : accountData?.level || ''}
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
              label={accountData?.level === 'College' ? 'Course' : 'Strand'}
              type='text'
              variant='filled'
              value={
                loading ? '' : accountData?.course || accountData?.strand || ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress size={25} />}
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

            <Stack className={classes.uploadContainer}>
              {idFile.url && (
                <img className={classes.image} src={idFile.url} alt='Random' />
              )}

              <Stack direction='row'>
                <label className={classes.label} htmlFor='id-photo'>
                  <Input
                    accept='image/*'
                    id='id-photo'
                    type='file'
                    onChange={handlePhotoUpload}
                  />

                  <UploadButton
                    disabled={loading}
                    file={idFile}
                    variant='contained'
                    component='span'
                    fullWidth
                  >
                    {!idFile.url ? (
                      <>Attach ID Picture</>
                    ) : (
                      <>Change ID Picture</>
                    )}
                  </UploadButton>
                </label>

                {idFile.url && (
                  <RemoveButton
                    color='secondary'
                    disabled={loading}
                    file={idFile}
                    onClick={() => setIdFile({ del: true })}
                    variant='contained'
                  >
                    <IconComponent icon='trash' />
                  </RemoveButton>
                )}
              </Stack>
            </Stack>

            <Stack className={classes.uploadContainer}>
              {signatureFile.url && (
                <img
                  className={classes.image}
                  src={signatureFile.url}
                  alt='Random'
                />
              )}

              <Stack direction='row'>
                <label className={classes.label} htmlFor='signature'>
                  <Input
                    accept='image/*'
                    id='signature'
                    type='file'
                    onChange={handleSignatureUpload}
                  />

                  <UploadButton
                    disabled={loading}
                    file={signatureFile}
                    variant='contained'
                    component='span'
                    fullWidth
                  >
                    {!signatureFile.url ? (
                      <>Attach E-Signature</>
                    ) : (
                      <>Change E-Signature</>
                    )}
                  </UploadButton>
                </label>

                {signatureFile.url && (
                  <RemoveButton
                    color='secondary'
                    disabled={loading}
                    file={signatureFile}
                    onClick={() => setSignatureFile({ del: true })}
                    variant='contained'
                  >
                    <IconComponent icon='trash' />
                  </RemoveButton>
                )}
              </Stack>
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
