import React from 'react';
import { Container, Stack, Button } from 'react-bootstrap';

function NotFound() {
  return (
    <Container className="text-center">
      <Stack>
        <h1>404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span>
          {' '}
          Page not found.
        </p>
        <p className="lead">
          The page you’re looking for doesn’t exist.
        </p>
        <Button href="/" className="align-self-center">Go Home</Button>
      </Stack>
    </Container>
  );
}

export default NotFound;
