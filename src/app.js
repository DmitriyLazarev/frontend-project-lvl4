import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import Login from './components/login';
import NotFound from './components/not-found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={1} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
