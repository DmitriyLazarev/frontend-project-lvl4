import React from 'react';

import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './components/login';
import NotFound from './components/not-found';

function App() {
  return (
    <Container className="h-100">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={1} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
