import { auth, db } from 'firebase.app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocFromServer,
  getDocsFromServer,
} from 'firebase/firestore';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserRoles, setCurrentUserRoles] = useState([]);
  const [currentUserRolesLoading, setCurrentUserRolesLoading] = useState(true);
  const [currentUserAccounts, setCurrentUserAccounts] = useState([]);
  const [hasID, setHasID] = useState(false);
  const [hasIDLoading, setHasIDLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleAuth = useMemo(
    () => ({
      register: (email, password) =>
        createUserWithEmailAndPassword(auth, email, password),
      login: (email, password) =>
        signInWithEmailAndPassword(auth, email, password),
      logout: () => signOut(auth),
      currentUser,
      currentUserRoles,
      handleCurrentUserRolesChange: (value) => setCurrentUserRoles(value),
      currentUserRolesLoading,
      currentUserAccounts,
      hasID,
      handleHasIDChange: (value) => setHasID(value),
      hasIDLoading,
      loading,
    }),
    [
      currentUser,
      currentUserRoles,
      currentUserRolesLoading,
      currentUserAccounts,
      hasID,
      hasIDLoading,
      loading,
    ],
  );

  onAuthStateChanged(auth, async (currentUser) => {
    setCurrentUser(currentUser);
    setLoading(false);
  });

  useEffect(() => {
    const getUserData = async () => {
      setCurrentUserRolesLoading(true);
      setHasIDLoading(true);

      const userDocumentRef = doc(db, 'users', currentUser?.uid);
      const userAccountsCollectionRef = collection(userDocumentRef, 'accounts');

      const dataRef = await getDocFromServer(userDocumentRef);
      const data = dataRef?.data();

      const accountsDataRef = await getDocsFromServer(
        userAccountsCollectionRef,
      );
      const accountsData = accountsDataRef?.docs?.map((doc) => doc?.data());

      setCurrentUserRoles(data?.roles || []);
      setCurrentUserRolesLoading(false);
      setCurrentUserAccounts(accountsData);
      setHasID(accountsData.some((a) => !!a?.photoURL && !!a?.signatureURL));
      setHasIDLoading(false);
    };

    if (!loading && currentUser?.uid) getUserData();
  }, [currentUser?.uid, loading]);

  return (
    <AuthContext.Provider value={handleAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
