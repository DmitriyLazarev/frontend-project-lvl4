import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card, Container, Stack,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

function Login() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SignupSchema = yup.object({
    username: yup.string()
      .required('required'),
    password: yup.string()
      .required('required'),
  });

  return (
    <Container
      className="h-100 d-flex"
    >

      <Stack
        className="justify-content-center align-self-center"
      >

        <Card>

          <Card.Body>

            <Card.Title>

              <h1>{t('title')}</h1>
            </Card.Title>

            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                setAuthFailed(false);

                try {
                  const res = await axios.post(routes.loginPath(), values);
                  // eslint-disable-next-line no-undef
                  localStorage.setItem('user', JSON.stringify(res.data));
                  auth.logIn();
                  navigate('/');
                } catch (err) {
                  if (err.isAxiosError && err.response.status === 401) {
                    setAuthFailed(true);
                    inputRef.current.select();
                    return;
                  }
                  throw err;
                }
              }}
            >
              {({
                errors,
                touched,
                isUsernameErrorShown = errors.username && touched.username,
                isPasswordErrorShown = errors.password && touched.password,
              }) => (
                <Form
                  className="d-flex flex-column"
                >
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="username"
                  >

                    <span
                      className="visually-hidden"
                    >
                      {t('username')}
                    </span>

                    <Field
                      innerRef={inputRef}
                      type="text"
                      id="username"
                      name="username"
                      required
                      placeholder={t('username')}
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid': isUsernameErrorShown,
                        },
                      )}
                    />
                    {isUsernameErrorShown ? (
                      <span
                        role="alert"
                        className="text-danger small"
                      >
                        {t(errors.username)}
                      </span>
                    ) : null}
                  </label>

                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="password"
                    className="mt-2"
                  >

                    <span
                      className="visually-hidden"
                    >
                      {t('password')}
                    </span>

                    <Field
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder={t('password')}
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid': isPasswordErrorShown,
                        },
                      )}
                    />
                    {isPasswordErrorShown ? (
                      <span
                        role="alert"
                        className="text-danger small"
                      >
                        {t(errors.password)}
                      </span>
                    ) : null}
                  </label>

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="mt-2"
                  >
                    {t('logIn')}
                  </Button>

                  {authFailed ? (
                    <p
                      role="alert"
                      className="text-danger m-0 mt-2"
                    >
                      {t('autFailed')}
                    </p>
                  ) : null}
                </Form>
              )}
            </Formik>
          </Card.Body>

          <Card.Footer
            className="d-flex align-items-center"
          >
            {t('notRegistered')}

            <Link
              to="/signup"
              variant="link"
              className="mx-2 link-primary"
            >
              {t('registration')}
            </Link>
          </Card.Footer>
        </Card>
      </Stack>
    </Container>
  );
}

export default Login;
