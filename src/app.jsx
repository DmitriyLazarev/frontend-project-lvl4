import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Provider as StoreProvider } from 'react-redux';
import Login from './components/login';
import useAuth from './hooks';
import NotFound from './components/notFound';
import Chat from './components/chat';
import store from './slices/index';
import AuthProvider from './providers/authProvider';

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

function AuthRoute({ children }) {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Navigate to="/" /> : children
  );
}

function App() {
  return (
    <StoreProvider store={store}>

      <AuthProvider>
        <div
          className="h-100 d-flex flex-column"
        >
          <Router>

            <div
              className="shadow-sm bg-white"
            >

              <Container className="d-flex justify-content-between align-items-center">

                <Navbar expand="lg">

                  <Navbar.Brand href="/">Hexlet Chat Project</Navbar.Brand>
                </Navbar>

                <AuthButton />
              </Container>
            </div>

            <Routes>
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
