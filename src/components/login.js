import React from 'react';
import {
  Button,
  Card, Container, Stack,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

function Login() {
  const SignupSchema = yup.object({
    loginField: yup.string()
      .min(2, 'Слишком короткий никнейм.')
      .max(16, 'Никнейм слишком длинный.')
      .required('Поле должно быть заполнено.'),
    passwordField: yup.string()
      .required('Поле должно быть заполнено.')
      .min(8, 'Пароль слишком короткий, должно быть минимум 8 символов.')
      .matches(/[a-zA-Z]/, 'Пароль должен состоять только из латинских букв.'),
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
              initialValues={{ loginField: '', passwordField: '' }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                errors,
                touched,
                isValid,
              }) => (
                <Form
                  className="d-flex flex-column"
                >
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="loginField"
                  >

                    <Field
                      type="text"
                      id="loginField"
                      name="loginField"
                      placeholder="Ваш ник"
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid': errors.loginField && touched.loginField,
                        },
                      )}
                    />
                    {errors.loginField && touched.loginField ? (
                      <span
                        role="alert"
                        className="text-danger small"
                      >
                        {errors.loginField}
                      </span>
                    ) : null}
                  </label>

                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="passwordField"
                    className="mt-2"
                  >

                    <Field
                      type="password"
                      id="passwordField"
                      name="passwordField"
                      placeholder="Ваш пароль"
                      className={clsx(
                        'form-control',
                        {
                          'is-invalid': errors.passwordField && touched.passwordField,
                        },
                      )}
                    />
                    {errors.passwordField && touched.passwordField ? (
                      <span
                        role="alert"
                        className="text-danger small"
                      >
                        {errors.passwordField}
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
                    Войти
                  </Button>
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
