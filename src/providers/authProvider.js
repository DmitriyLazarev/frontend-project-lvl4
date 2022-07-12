import React, { useState } from 'react';
import AuthContext from '../contexts';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getUsername = () => {
    // eslint-disable-next-line no-undef
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  };
  const getRequestHeader = () => {
    // eslint-disable-next-line no-undef
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { headers: { Authorization: `Bearer ${user.token}` } };
    }
    return {};
  };

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
