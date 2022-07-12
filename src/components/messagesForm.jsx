import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function MessagesBody() {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className="p-3"
    >

      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form
            className="d-flex"
          >

            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="username"
              className="w-100"
            >

              <Field
                innerRef={inputRef}
                type="text"
                id="username"
                name="username"
                placeholder={t('placeholder')}
                className="form-control"
              />
            </label>

            <Button
              variant="primary"
              type="submit"
              className="mx-1"
            >
              {t('addButton')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MessagesBody;
