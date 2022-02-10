import { auth } from 'firebase.app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserRoles] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAuth = useMemo(
    () => ({
      register: ({ email, password }) =>
        createUserWithEmailAndPassword(auth, email, password),
      login: ({ email, password }) =>
        signInWithEmailAndPassword(auth, email, password),
      logout: () => signOut(auth),
      currentUser,
      currentUserRoles,
      loading,
    }),
    [currentUser, currentUserRoles, loading],
  );

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
    setLoading(false);
  });

  return (
    <AuthContext.Provider value={handleAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
