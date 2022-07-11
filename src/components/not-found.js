import React from 'react';
import { Button, Card, Stack } from 'react-bootstrap';

function NotFound() {
  return (
    <Stack className="h-100 justify-content-center align-items-center">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>
            <h1>404</h1>
          </Card.Title>
          <Card.Text>
            Запрашеваемая страница не существует.
          </Card.Text>
          <Button href="/" variant="primary">На главную</Button>
        </Card.Body>
      </Card>
    </Stack>
  );
}

export default NotFound;
