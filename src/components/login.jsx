import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card, Container, Stack,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

function Login() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

              <h1>Войти</h1>
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
                  const { from } = location.state || { from: { pathname: '/' } };
                  navigate(from);
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
                isValid,
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

                    <Field
                      innerRef={inputRef}
                      type="text"
                      id="username"
                      name="username"
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

                    <Field
                      type="password"
                      id="password"
                      name="password"
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
                    disabled={!isValid}
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
        </Card>
      </Stack>
    </Container>
  );
}

export default Login;
