import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import Login from './components/login';
import AuthContext from './contexts/index';
import useAuth from './hooks/index';
import NotFound from './components/not-found';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const value = React.useMemo(() => ({
    loggedIn, logIn, logOut,
  }), [loggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function AuthButton() {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
}

function LoginRoute() {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <NotFound />
      : <Login />
  );
}

function App() {
  return (
    <AuthProvider>
      <div
        className="h-100 d-flex flex-column"
      >
        <Router>

          <div
            className="shadow-sm"
          >

            <Container className="d-flex justify-content-between align-items-center">

              <Navbar bg="light" expand="lg">

                <Navbar.Brand href="/">Hexlet Chat Project</Navbar.Brand>
              </Navbar>

              <AuthButton />
            </Container>
          </div>

          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/" element={<PrivateRoute>1</PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
