import { useTranslation } from 'react-i18next';
import React, { createRef, useEffect } from 'react';
import {
  Button, FloatingLabel, Modal, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFormik,
} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { changeChannel, selectors } from '../../slices/channelsSlice';
import useChatApi from '../../hooks/useChatApi';
import { hideModal } from '../../slices/modalSlice';

function CreateChannelModal() {
  const { t } = useTranslation('translation', { keyPrefix: 'createChannelModal' });
  const inputRef = createRef();

  const { addNewChannel } = useChatApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((item) => item.name);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      dispatch(changeChannel(response.data.id));
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

  const f = useFormik({
    initialValues: { channelName: '' },
    validationSchema,
    onSubmit: (values) => {
      const name = values.channelName;
      addNewChannel({ name }, apiResponseHandle);
    },
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

        <Form
          onSubmit={f.handleSubmit}
        >

          <FloatingLabel label={t('fieldPlaceholder')} controlId="channelName">
            <Form.Control
              name="channelName"
              type="text"
              id="channelName"
              placeholder={t('fieldPlaceholder')}
              ref={inputRef}
              value={f.values.channelName}
              onChange={f.handleChange}
              isInvalid={(f.touched.channelName && !!f.errors.channelName)}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.channelName ? t(f.errors.channelName) : null}
            </Form.Control.Feedback>
          </FloatingLabel>

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
              className="mx-2"
            >
              {t('createButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateChannelModal;
