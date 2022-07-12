import React from 'react';
import {
  Button, Card, Container, Stack,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation('translation', { keyPrefix: 'page404' });
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
              {t('pageNotFound')}
            </Card.Text>

            <Button
              href="/"
              variant="primary"
            >
              {t('mainPage')}
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}

export default NotFound;
