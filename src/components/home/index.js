import {
  Box,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/system';
import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardItem: {
    borderRadius: theme.spacing(1.5),
    outline: `1px solid ${theme.palette.divider}`,
    padding: [theme.spacing(3), theme.spacing(4)].join(' '),
  },
}));

const HomeComponent = () => {
  const [loading, setLoading] = useState(true);
  const [userAccounts, setUserAccounts] = useState([]);

  const isMounted = useRef(true);

  const classes = useStyles();

  const { currentUser } = useAuth();
  const { open } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAccounts = async () => {
      if (!currentUser.uid) return;

      setLoading(true);

      try {
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        const userAccountsCollectionRef = collection(
          userDocumentRef,
          'accounts',
        );
        const accountsRef = await getDocs(userAccountsCollectionRef);

        if (!isMounted.current) return;

        setUserAccounts(accountsRef?.docs?.map((doc) => doc.data()));
        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    getUserAccounts();

    return () => (isMounted.current = false);
  }, [currentUser.uid, open]);

  const handleSelectID = (id) => {
    navigate(`form/${id}`);
  };

  return !loading ? (
    <Container maxWidth='sm' sx={{ width: '100%' }}>
      <List>
        {userAccounts.length > 0 &&
          userAccounts.map(
            (
              { course, idNumber, level, photoURL, signatureURL, strand },
              index,
            ) => (
              <ListItemButton
                key={index}
                sx={{
                  padding: 0,
                  margin: [theme.spacing(3), 0].join(' '),
                  borderRadius: theme.spacing(1.5),
                }}
                onClick={() => handleSelectID(idNumber)}
              >
                <Box className={classes.cardItem} sx={{ width: '100%' }}>
                  <ListItemText>
                    <Typography variant='h5' gutterBottom>
                      {idNumber}
                    </Typography>
                    <Typography variant='body1'>{level}</Typography>
                    <Typography variant='body1'>{course || strand}</Typography>
                  </ListItemText>
                </Box>
              </ListItemButton>
            ),
          )}
      </List>
    </Container>
  ) : (
    <LoadingComponent />
  );
};

export default HomeComponent;
