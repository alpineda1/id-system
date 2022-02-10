import { auth } from 'firebase.app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const handleAuth = useMemo(
    () => ({
      register: async ({ email, password }) => {
        try {
          return await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.error(e.message);
        }
      },
      login: async ({ email, password }) => {
        try {
          return await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          console.error(e.message);
        }
      },
      logout: async () => await signOut(auth),
      currentUser,
    }),
    [currentUser],
  );

  useEffect(() => {}, []);

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  return (
    <AuthContext.Provider value={handleAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
