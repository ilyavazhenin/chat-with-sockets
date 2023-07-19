/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { selectors } from '../slices/channelsSlice';
import notify from '../utils/toast-notifier';
import { addChannelSchema } from '../utils/yup-schemas';
import useSocket from '../hooks/useSocket';
import socketInstance from '../utils/socket-init';
import useUser from '../hooks/useUser';

const UniversalModal = (props) => {
  const { t } = useTranslation();
  const { renameChannel, createChannel, removeChannel } = useSocket(socketInstance);
  const { currentUser } = useUser();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const modalState = useSelector((state) => state.modals);
  const {
    title,
    actionButton,
    actionVariant,
    fieldsShow,
    bodyText,
    modalType,
    currentchannel,
  } = modalState.modalConfig;

  const { onHide, show } = props;

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    await removeChannel({ id }, notify);
    onHide();
  };

  const formik = useFormik({
    initialValues: {
      channelName: currentchannel?.name ?? '',
    },
    validationSchema: addChannelSchema(channelsNames),
    onSubmit: async (values) => {
      if (modalType === 'rename') {
        const payload = {
          ...currentchannel,
          name: values.channelName,
        };
        await renameChannel(payload, notify);
      }

      if (modalType === 'create') {
        const payload = {
          name: values.channelName,
          createdByUser: currentUser.userName,
        };
        await createChannel(payload, notify);
      }

      onHide();
      formik.resetForm();
    },
  });
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.value = currentchannel?.name ?? '';
        inputRef.current.focus();
        inputRef.current.select();
      }, 0);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      currentchannel={currentchannel?.name ?? ''}
      allchannels={channelsNames}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyText ?? null}
        <Form onSubmit={formik.handleSubmit}>
          {fieldsShow ? (
            <Form.Group
              className="mb-3"
              controlId="channelName"
            >
              <Form.Label>{t('chat.modals.channelName')}</Form.Label>
              <Form.Control
                type="text"
                name="channelName"
                onChange={formik.handleChange}
                value={formik.values.channelName}
                autoFocus
                ref={inputRef}
                onKeyDown={(e) => e.stopPropagation()}
              />

              <Form.Text className="text-danger">
                {formik.touched.channelName && formik.errors.channelName ? (
                  <div className="text-danger">{formik.errors.channelName}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
          ) : null}
          <Modal.Footer
            xs="auto"
            className="justify-content-end border-0"
          >
            <Button
              onClick={onHide}
              variant="secondary"
            >
              {t('chat.modals.cancel')}
            </Button>
            <Button
              variant={actionVariant}
              onClick={modalType === 'delete' ? handleDelete(currentchannel.id) : formik.handleSubmit}
            >
              {actionButton}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UniversalModal;
