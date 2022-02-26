import { auth, db } from 'firebase.app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserRoles, setCurrentUserRoles] = useState([]);
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
      hasID,
      hasIDLoading,
      loading,
    }),
    [currentUser, currentUserRoles, hasID, hasIDLoading, loading],
  );

  onAuthStateChanged(auth, async (currentUser) => {
    setCurrentUser(currentUser);
    setLoading(false);
  });

  useEffect(() => {
    const getUserData = async () => {
      const userDocumentRef = doc(db, 'users', currentUser?.uid);
      const dataRef = await getDoc(userDocumentRef);
      const data = dataRef.data();

      setCurrentUserRoles(data?.roles || []);
      setHasID(!!data?.photoURL && !!data?.signatureURL);
      setHasIDLoading(false);
    };

    if (!loading && currentUser?.uid) getUserData();
  }, [currentUser?.uid, loading]);

  return (
    <AuthContext.Provider value={handleAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
