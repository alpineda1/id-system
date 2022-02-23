//import Webcam from "react-webcam";
import { Container } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { db } from 'firebase.app';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

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
  const [error, setError] = useState('');
  const [idFile, setIdFile] = useState('');
  const [signatureFile, setSignatureFile] = useState('');
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  const { currentUser } = useAuth();

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
        if (!isMounted.current) return;

        setError(e.message);
        setLoading(false);
      }
    };

    getUserData();

    return () => (isMounted.current = false);
  }, [currentUser.uid]);

  return (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      Hello
    </Container>
  );
};

export default IDPreviewComponent;
