import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import Login from './components/login';
import useAuth from './hooks';
import NotFound from './components/notFound';
import Chat from './components/chat';
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
  );
}

export default App;
