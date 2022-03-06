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
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
  noBreakline: {
    whiteSpace: 'nowrap',
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
  const {
    currentUser,
    loading: currentUserLoading,
    currentUserRolesLoading,
    handleHasIDChange,
  } = useAuth();
  const { open } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    isMounted.current = true;

    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const queryRef = id
          ? query(
              collection(userDocumentRef, 'accounts'),
              where('idNumber', '==', id),
            )
          : query(
              collection(userDocumentRef, 'accounts'),
              orderBy('createdAt'),
            );

        const dataRef = await getDoc(userDocumentRef);
        const querySnapshot = await getDocs(queryRef);

        const localData = dataRef.data();
        const localAccountData = querySnapshot.docs.slice(-1)[0].data();

        if (!isMounted.current) return;

        setData(localData);
        setAccountID(querySnapshot.docs.slice(-1)[0].id);
        setAccountData({
          ...localAccountData,
          createdAt: localAccountData.createdAt.toDate(),
        });

        if (localAccountData?.photoURL)
          setIdFile({ url: localAccountData?.photoURL });
        if (localAccountData?.signatureURL)
          setSignatureFile({ url: localAccountData?.signatureURL });

        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setError(e.message);
        setLoading(false);
      }
    };

    if (!!currentUser.uid && !currentUserLoading && !currentUserRolesLoading)
      getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid, id, open, currentUserLoading, currentUserRolesLoading]);

  const handleNickChange = (e) => {
    setData((prev) => ({
      ...prev,
      name: { ...prev.name, nick: e.target.value },
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target?.files?.[0];
    setError('');
    setIdFile({ file, url: URL.createObjectURL(file) });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target?.files?.[0];
    setError('');
    setSignatureFile({ file, url: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      idFile?.file?.name?.split('.')?.[0] !== `PIC${accountData.idNumber}` &&
      idFile?.file
    ) {
      window.scrollTo(0, 0);
      setError(
        "The file name of ID photo doesn't comply with the requirements",
      );
      setLoading(false);
      return;
    }

    if (
      signatureFile?.file?.name?.split('.')?.[0] !==
        `SIG${accountData.idNumber}` &&
      signatureFile?.file
    ) {
      window.scrollTo(0, 0);
      setError(
        "The file name of the signature doesn't comply with the requirements",
      );
      setLoading(false);
      return;
    }

    try {
      const photoStorageRef = idFile?.file
        ? ref(
            storage,
            `/users/photo/${
              accountData.level === 'College' ? 'college' : 'shs'
            }-${currentUser.uid}.${idFile.file.name.split('.')[1]}`,
          )
        : '';

      const signatureStorageRef = signatureFile?.file
        ? ref(
            storage,
            `users/signature/${
              accountData.level === 'College' ? 'college' : 'shs'
            }-${currentUser.uid}.${signatureFile.file.name.split('.')[1]}`,
          )
        : '';

      if (!data?.name?.nick) {
        window.scrollTo(0, 0);

        setError('Nickname cannot be empty');
        setLoading(false);
        return;
      }

      if (!photoStorageRef && !idFile.url) {
        window.scrollTo(0, 0);

        setError('ID Photo cannot be empty');
        setLoading(false);
        return;
      }

      if (!signatureStorageRef && !signatureFile.url) {
        window.scrollTo(0, 0);

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
          : accountData?.photoURL
          ? accountData?.photoURL
          : '';

        const signature = signatureFile.del
          ? ''
          : signatureRef
          ? await getDownloadURL(signatureRef)
          : accountData?.signatureURL
          ? accountData?.signatureURL
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
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, 'history'), {
        ...data,
        ...accountData,
        photoURL,
        signatureURL,
        createdAt: serverTimestamp(),
        reason:
          !accountData?.photoURL || !accountData?.signatureURL
            ? 'Uploaded ID photo and signature for the first time'
            : photoStorageRef && signatureStorageRef
            ? 'Updated ID photo and signature'
            : 'Changed nickname',
      });

      await updateDoc(userAcccountDocRef, {
        photoURL,
        signatureURL,
        createdAt: serverTimestamp(),
      });

      const successMessage =
        !accountData?.photoURL || !accountData?.signatureURL
          ? 'Successfully uploaded images'
          : photoStorageRef && signatureStorageRef
          ? 'Successfully updated images'
          : 'Successfully updated fields';

      open(successMessage, 'success');

      handleHasIDChange(true);

      navigate(id ? `/preview/${id}` : '/preview');
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

            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant='body1'>
                  Please upload your picture (headshot up to your chest) here.
                  Make sure the photo is well lighted.
                </Typography>

                <ul>
                  <li>
                    <Typography component='span' variant='body1'>
                      Filename: <code>PICnumber.jpg</code> or <code>.png</code>.
                      For example:{' '}
                      <span className={classes.noBreakline}>
                        <strong>
                          <code>PIC2021-123456.jpg</code>
                        </strong>
                      </span>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body1'>
                      For male students, please wear a shirt with collar. For
                      female students, please wear a blouse with collar.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body1'>
                      Please use a white background.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body1'>
                      Image size: 2 inches x 2 inches.
                    </Typography>
                  </li>
                </ul>
              </Stack>

              <Stack className={classes.uploadContainer}>
                {idFile.url && (
                  <img
                    className={classes.image}
                    src={idFile.url}
                    alt='Random'
                  />
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
            </Stack>

            <Stack spacing={2}>
              <Stack spacing={1}>
                <Stack>
                  <Typography variant='body1'>
                    Please upload a picture of your signature.
                  </Typography>

                  <Typography variant='body1'>How to do this:</Typography>
                </Stack>

                <ul>
                  <li>
                    <Typography variant='body1'>
                      Make sure the image has either a <strong>white</strong> or
                      a <strong>transparent</strong> background.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body1'>
                      Your signature must be within 1 inch tall and 2 inches
                      wide only.
                    </Typography>
                  </li>
                  <li>
                    <Typography component='span' variant='body1'>
                      Filename: <code>SIGidnumber.jpg</code> or{' '}
                      <code>.png</code>. For example:{' '}
                      <span className={classes.noBreakline}>
                        <strong>
                          <code>SIG2021-123456.jpg</code>
                        </strong>
                      </span>
                    </Typography>
                  </li>
                </ul>
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
