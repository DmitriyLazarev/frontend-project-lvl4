import { useTranslation } from 'react-i18next';
import React, { createRef, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { changeChannel, selectors } from '../../slices/channelsSlice';
import useChatApi from '../../hooks/useChatApi';

function CreateChannelModal() {
  const { t } = useTranslation('translation', { keyPrefix: 'createChannelModal' });
  const [isCreateChannelModalVisible, setIsCreateChannelModalVisible] = useState(false);
  const inputRef = createRef();

  const { addNewChannel } = useChatApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((item) => item.name);
  const dispatch = useDispatch();

  const handleCreateChannelModalClose = () => {
    setIsCreateChannelModalVisible(false);
  };

  useEffect(() => {
    if (isCreateChannelModalVisible) {
      inputRef.current.focus();
    }
  }, [isCreateChannelModalVisible, inputRef]);

  const handleCreateChannelModalOpen = () => {
    setIsCreateChannelModalVisible(true);
  };

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      dispatch(changeChannel(response.data.id));
      setIsCreateChannelModalVisible(false);
    } else {
      toast.error(t('networkError'), {
        position: 'top-center',
      });
    }
  };

  const validationSchema = yup.object({
    channelName: yup.string()
      .required('required', 'required')
      .notOneOf(channelsNames, 'alreadyExist'),
  });

  return (
    <>
      <Button
        className="d-flex align-items-center"
        variant="outline-primary"
        size="sm"
        onClick={handleCreateChannelModalOpen}
      >
        {t('createButton')}
      </Button>

      <Modal
        show={isCreateChannelModalVisible}
        onHide={handleCreateChannelModalClose}
      >

        <Modal.Header closeButton>
          <Modal.Title>{t('modalTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const name = values.channelName;
              addNewChannel({ name }, apiResponseHandle);
            }}
          >
            {({
              errors,
              touched,
              isValid,
              isChannelNameErrorShown = errors.channelName && touched.channelName,
            }) => (
              <Form>

                <label
                  htmlFor="channelName"
                  className="w-100"
                >

                  <Field
                    innerRef={inputRef}
                    type="text"
                    id="channelName"
                    name="channelName"
                    placeholder={t('fieldPlaceholder')}
                    className={clsx(
                      'form-control',
                      {
                        'is-invalid': isChannelNameErrorShown,
                      },
                    )}
                  />

                  {isChannelNameErrorShown ? (
                    <span
                      className="text-danger small"
                    >
                      {t(errors.channelName)}
                    </span>
                  ) : null}
                </label>

                <div
                  className="d-flex mt-3"
                >

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCreateChannelModalClose}
                  >
                    {t('cancel')}
                  </Button>

                  <Button
                    type="submit"
                    disabled={!isValid}
                    className="mx-2"
                  >
                    {t('createButton')}
                  </Button>
                </div>
              </Form>
            )}

          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateChannelModal;
