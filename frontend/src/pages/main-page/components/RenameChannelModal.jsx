/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import socket from '../../../utils/socket-init';
import { selectors } from '../../../slices/channelsSlice';

const RenameChannelModal = (props) => {
  const { t } = useTranslation();
  // TODO: сделать переиспользуемый инстанс схемы? для создания и редактирования канала
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
    validationSchema: Yup.object({
      channelName: Yup.string()
        .min(3, t('chat.errors.from3to20symbls'))
        .max(20, t('chat.errors.from3to20symbls'))
        .required(t('general.errors.requiredField'))
        .notOneOf(allchannels, t('chat.errors.uniqueChannel')),
    }),
    onSubmit: (values) => {
      const renamedChannel = {
        ...currentchannel,
        name: values.channelName,
      };
      socket.connect();
      socket.emit('renameChannel', renamedChannel);
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

const RenameChannelButton = (props) => {
  const { t } = useTranslation();
  const { channelId } = props;
  const [modalShow, setModalShow] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const currentChannel = channels.find((el) => el.id === channelId);
  const channelsNames = channels
    .map((channel) => channel.name);
  console.log(channelsNames, 'channelsNames');
  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
      >
        {t('chat.renameChannel')}
      </button>
      <RenameChannelModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentchannel={currentChannel}
        allchannels={channelsNames}
      />
    </>
  );
};

export default RenameChannelButton;
