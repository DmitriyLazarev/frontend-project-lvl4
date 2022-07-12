import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import Login from './components/login';
import useAuth from './hooks';
import NotFound from './components/notFound';
import Chat from './components/chat';
import store from './slices/index';
import AuthProvider from './providers/authProvider';
import AppHeader from './components/appHeader';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
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

            <AppHeader />

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
