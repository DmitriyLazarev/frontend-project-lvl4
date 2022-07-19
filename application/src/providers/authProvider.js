import React, { useCallback, useState } from 'react';
import AuthContext from '../contexts/authContext';

function AuthProvider({ children }) {
  // eslint-disable-next-line no-undef
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));
  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  const getUsername = useCallback(() => {
    // eslint-disable-next-line no-undef
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  }, []);

  const getRequestHeader = useCallback(() => {
    // eslint-disable-next-line no-undef
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { headers: { Authorization: `Bearer ${user.token}` } };
    }
    return {};
  }, []);

  const value = React.useMemo(() => ({
    loggedIn, logIn, logOut, getUsername, getRequestHeader,
  }), [loggedIn, logIn, logOut, getUsername, getRequestHeader]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
