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
    <div
      className="h-100 d-flex flex-column"
    >

      <div
        className="shadow-sm bg-white p-3"
      >
        <Container>

          <p
            className="h5 m-0"
          >
            Hexlet Chat Project
          </p>
        </Container>
      </div>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={1} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
