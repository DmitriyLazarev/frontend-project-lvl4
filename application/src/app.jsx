import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/login';
import useAuth from './hooks/useAuth';
import NotFound from './components/notFound';
import Chat from './components/chat';
import AppHeader from './components/appHeader';
import SignUp from './components/signup';
import 'react-toastify/dist/ReactToastify.css';
import routes from './utils/routes';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
}

function AuthRoute({ children }) {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Navigate to={routes.mainPage()} /> : children
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
          <Route path={routes.loginPage()} element={<AuthRoute><Login /></AuthRoute>} />
          <Route path={routes.mainPage()} element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path={routes.signUpPage()} element={<AuthRoute><SignUp /></AuthRoute>} />
          <Route path={routes.notFoundPage()} element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
