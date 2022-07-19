import {
  Button, Card, Container, Stack,
} from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' });
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = yup.object({
    username: yup.string()
      .min(3, 'minUsername')
      .max(20, 'maxUsername')
      .required('required'),
    password: yup.string()
      .min(6, 'minPassword')
      .required('required'),
    confirmPassword: yup.string()
      .required('required')
      .oneOf([yup.ref('password')], 'samePassword'),
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
              initialValues={{ username: '', password: '', confirmPassword: '' }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                try {
                  const response = await axios.post(routes.registrationPath(), values);
                  // eslint-disable-next-line no-undef
                  localStorage.setItem('user', JSON.stringify(response.data));
                  setSignUpFailed(false);
                  logIn();
                  navigate('/');
                } catch (err) {
                  if (err.isAxiosError && err.response.status === 409) {
                    setSignUpFailed(true);
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
                isConfirmPasswordErrorShown = errors.confirmPassword && touched.confirmPassword,
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

                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="confirmPassword"
                    className="mt-2"
                  >

                    <span
                      className="visually-hidden"
                    >
                      {t('confirmPassword')}
                    </span>

                    <Field
                      type="password"
                      id="confirmPassword"
                      required
                      name="confirmPassword"
                      placeholder={t('confirmPassword')}
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid': isConfirmPasswordErrorShown,
                        },
                      )}
                    />
                    {isConfirmPasswordErrorShown ? (
                      <span
                        role="alert"
                        className="text-danger small"
                      >
                        {t(errors.confirmPassword)}
                      </span>
                    ) : null}
                  </label>

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="mt-2"
                  >
                    {t('signUp')}
                  </Button>

                  {signUpFailed ? (
                    <p
                      role="alert"
                      className="text-danger m-0 mt-2"
                    >
                      {t('signUpFailed')}
                    </p>
                  ) : null}
                </Form>
              )}
            </Formik>
          </Card.Body>

          <Card.Footer
            className="d-flex align-items-center"
          >
            {t('registered')}

            <Link
              to="/login"
              variant="link"
              className="mx-2 link-primary"
            >
              {t('signin')}
            </Link>
          </Card.Footer>
        </Card>
      </Stack>
    </Container>
  );
}

export default SignUp;
