import React from 'react';
import {
  Button, Card, Container, Stack,
} from 'react-bootstrap';

function NotFound() {
  return (
    <Container
      className="h-100 d-flex"
    >

      <Stack
        className="justify-content-center"
      >

        <Card
          className="text-center"
        >

          <Card.Body>

            <Card.Title>

              <h1>404</h1>
            </Card.Title>

            <Card.Text>
              Запрашеваемая страница не существует.
            </Card.Text>

            <Button
              href="/"
              variant="primary"
              size="lg"
            >
              На главную
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}

export default NotFound;
