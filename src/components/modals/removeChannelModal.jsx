import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { hideModal } from '../../slices/modalSlice';
import useChatApi from '../../hooks/useChatApi';

function RemoveChannelModal() {
  const { t } = useTranslation('translation', { keyPrefix: 'removeChannelModal' });
  const [isNetworkError, setIsNetworkError] = useState(false);

  const { removeCurrentChannel } = useChatApi();
  const currentChannel = useSelector((state) => state.modals.item);
  const dispatch = useDispatch();

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
    } else {
      setIsNetworkError(true);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    removeCurrentChannel(currentChannel, apiResponseHandle);
  };

  return (
    <Modal
      show
      onHide={() => dispatch(hideModal())}
    >

      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('description')}
      </Modal.Body>

      <Modal.Footer>

        <Form
          onSubmit={onFormSubmit}
        >

          <div
            className="d-flex mt-3"
          >

            <Button
              type="button"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('cancel')}
            </Button>

            <Button
              type="submit"
              variant="danger"
              className="mx-2"
            >
              {t('removeButton')}
            </Button>
          </div>

          {isNetworkError ? (
            <span
              className="text-danger small"
            >
              {t('networkError')}
            </span>
          ) : null}
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveChannelModal;
