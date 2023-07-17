/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import notify from '../../utils/toast-notifier';
import { addChannelSchema } from '../../utils/yup-schemas';
import useUser from '../../hooks/useUser';
import useSocket from '../../hooks/useSocket';
import socket from '../../utils/socket-init';

const AddChannelModal = (props) => {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { createChannel } = useSocket(socket);

  const {
    onHide,
    show,
    allchannels,
  } = props;

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: addChannelSchema(allchannels),
    onSubmit: async (values) => {
      const newChannel = {
        name: values.channelName,
        createdByUser: currentUser.userName,
      };
      await createChannel(newChannel, notify);
      onHide();
      formik.resetForm();
    },
  });

  return (
    <Modal
      onHide={onHide}
      show={show}
      allchannels={allchannels}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('chat.modals.addChannel')}
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
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              autoFocus
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

export default AddChannelModal;
