//import Webcam from "react-webcam";
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  idCard: {
    borderRadius: theme.spacing(1.5),
    outline: ['1px solid', theme.palette.divider].join(' '),
  },
}));

const IDPreviewComponent = () => {
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
  const [idFile, setIdFile] = useState('');
  const [signatureFile, setSignatureFile] = useState('');
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const classes = useStyles();

  const { currentUser } = useAuth();
  const { open } = useSnackbar();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const dataRef = await getDoc(userDocumentRef);
        const data = dataRef.data();
        setData(data);

        if (data?.photoURL) setIdFile({ url: data.photoURL });
        if (data?.signatureURL) setSignatureFile({ url: data.signatureURL });

        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    if (!!currentUser.uid) getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid, open]);

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <div className={classes.idCard}>dfsfsd</div>
    </Container>
  );
};

export default IDPreviewComponent;
