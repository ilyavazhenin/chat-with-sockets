/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import notify from '../../utils/toast-notifier';
import { addChannelSchema } from '../../utils/yup-schemas';
import useSocket from '../../hooks/useSocket';
import socket from '../../utils/socket-init';

const RenameChannelModal = (props) => {
  const { t } = useTranslation();
  const socketInstance = useSocket(socket);

  const {
    currentchannel,
    allchannels,
    onHide,
    show,
  } = props;

  const formik = useFormik({
    initialValues: {
      channelName: currentchannel.name,
    },
    validationSchema: addChannelSchema(allchannels),
    onSubmit: async (values) => {
      const renamedChannel = {
        ...currentchannel,
        name: values.channelName,
      };
      (await socketInstance).renameChannel(renamedChannel, notify);
      onHide();
      formik.resetForm();
    },
  });
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.value = currentchannel.name;
        inputRef.current.focus();
        inputRef.current.select();
      }, 0);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      currentchannel={currentchannel}
      allchannels={allchannels}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('chat.modals.renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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
              onKeyDown={(e) => e.stopPropagation()} // fixes a bootstrap bug ('space' not working)
            />

            <Form.Text className="text-danger">
              {formik.touched.channelName && formik.errors.channelName ? (
                <div className="text-danger">{formik.errors.channelName}</div>
              ) : null}
            </Form.Text>
          </Form.Group>
          <Row
            xs="auto"
            className="justify-content-end"
          >
            <Col>
              <Button
                onClick={onHide}
                variant="secondary"
              >
                {t('chat.modals.cancel')}
              </Button>
            </Col>
            <Col>
              <Button
                type="submit"
                variant="primary"
                onClick={formik.handleSubmit}
              >
                {t('chat.modals.send')}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
