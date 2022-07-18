import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/login';
import useAuth from './hooks/useAuth';
import NotFound from './components/notFound';
import Chat from './components/chat';
import AppHeader from './components/appHeader';
import SignUp from './components/signup';

function PrivateRoute({ children }) {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
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
          <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;