import React from 'react';
import {
  Button,
  Container, Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

function AuthButton() {
  const auth = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('logOut')}</Button>
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
