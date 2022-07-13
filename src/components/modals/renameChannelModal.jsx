import { useTranslation } from 'react-i18next';
import React, { createRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { selectors } from '../../slices/channelsSlice';
import useChatApi from '../../hooks/useChatApi';
import { hideModal } from '../../slices/modalSlice';

function RenameChannelModal() {
  const { t } = useTranslation('translation', { keyPrefix: 'renameChannelModal' });
  const inputRef = createRef();

  const { renameCurrentChannel } = useChatApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((item) => item.name);
  const currentChannel = useSelector((state) => state.modals.item);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      dispatch(hideModal());
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
    <Modal
      show
      onHide={() => dispatch(hideModal())}
    >

      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Formik
          initialValues={{ channelName: currentChannel.name }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const name = values.channelName;
            renameCurrentChannel({
              id: currentChannel.id,
              name,
            }, apiResponseHandle);
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
                  onClick={() => dispatch(hideModal())}
                >
                  {t('cancel')}
                </Button>

                <Button
                  type="submit"
                  disabled={!isValid}
                  className="mx-2"
                >
                  {t('renameButton')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannelModal;
