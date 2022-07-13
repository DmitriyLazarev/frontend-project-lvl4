import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useChatApi from '../hooks/useChatApi';
import useAuth from '../hooks/useAuth';

function MessagesBody() {
  const { t } = useTranslation('translation', { keyPrefix: 'messages' });

  const { getUsername } = useAuth();

  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState('');

  const messageHandler = (e) => {
    setIsError(false);
    setMessage(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelId = useSelector((state) => state.channels.currentChannelId);
  const { sendNewMessage } = useChatApi();
  const username = getUsername();
  const outgoingMessage = {
    body: message,
    username,
    channelId,
  };
  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      setMessage('');
    } else {
      setIsError(true);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendNewMessage(outgoingMessage, apiResponseHandle);
  };

  return (
    <div
      className="p-3"
    >

      <Form
        onSubmit={onFormSubmit}
        className="d-flex flex-column"
      >

        <div
          className="d-flex"
        >

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="username"
            className="w-100"
          >

            <Form.Control
              ref={inputRef}
              type="text"
              id="username"
              name="username"
              placeholder={t('placeholder')}
              value={message}
              onChange={messageHandler}
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
        </div>

        {isError ? (
          <p
            className="text-danger small mt-1"
          >
            {t('networkError')}
          </p>
        ) : null}
      </Form>
    </div>
  );
}

export default MessagesBody;
