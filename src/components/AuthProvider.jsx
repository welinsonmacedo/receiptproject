import React, { useState, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthenticated(true);
      setUserId(user.uid);
    } else {
      setAuthenticated(false);
      setUserId(null);
    }
  });

  return (
    <AuthContext.Provider value={{ authenticated, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
