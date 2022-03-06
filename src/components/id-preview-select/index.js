import IDListUserComponent from 'components/id-list-user';
import LoadingComponent from 'components/utils/loading';
import { useAuth } from 'contexts/auth';
import { useSnackbar } from 'contexts/snackbar';
import { db } from 'firebase.app';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IDPreviewSelectComponent = () => {
  const [loading, setLoading] = useState(true);
  const [userAccounts, setUserAccounts] = useState([]);

  const isMounted = useRef(true);

  const { currentUser } = useAuth();
  const { open } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    isMounted.current = true;

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

        if (accountsRef?.docs?.length <= 1) {
          navigate(`/preview/${accountsRef?.docs?.[0].data().idNumber}`);
          return;
        }

        if (!isMounted.current) return;

        setUserAccounts(
          accountsRef?.docs
            ?.map((doc) => doc.data())
            .sort((a, b) =>
              a?.createdAt.toDate() > b?.createdAt.toDate()
                ? -1
                : a?.createdAt.toDate() < b?.createdAt.toDate()
                ? 1
                : 0,
            ),
        );
        setLoading(false);
      } catch (e) {
        open(e.message, 'error');

        if (!isMounted.current) return;

        setLoading(false);
      }
    };

    getUserAccounts();

    return () => (isMounted.current = false);
  }, [currentUser.uid, open, navigate]);

  return !loading ? (
    <IDListUserComponent
      prefix='preview'
      userAccounts={userAccounts}
      disabledItem={{ param: 'level', value: 'Senior High School' }}
    />
  ) : (
    <LoadingComponent />
  );
};

export default IDPreviewSelectComponent;
