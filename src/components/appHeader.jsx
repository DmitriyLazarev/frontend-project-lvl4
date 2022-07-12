import React from 'react';
import {
  Button,
  Container, Navbar,
} from 'react-bootstrap';
import useAuth from '../hooks';

function AuthButton() {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
}

function AppHeader() {
  return (
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
  );
}

export default AppHeader;
