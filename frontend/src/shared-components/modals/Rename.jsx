import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice';
import notify from '../../utils/toast-notifier';
import { addChannelSchema } from '../../utils/yup-schemas';
import useSocket from '../../hooks/useSocket';
import socketInstance from '../../utils/socket-init';

const RenameModal = (props) => {
  const { t } = useTranslation();
  const { renameChannel } = useSocket(socketInstance);
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const modalState = useSelector((state) => state.modals);
  const { isOpened, channelId } = modalState;
  const currentchannel = channels.find((el) => el.id === channelId);
  const { onHide } = props;

  const formik = useFormik({
    initialValues: {
      channelName: currentchannel?.name ?? '',
    },
    validationSchema: addChannelSchema(channelsNames),
    onSubmit: async (values) => {
      const payload = {
        ...currentchannel,
        name: values.channelName,
      };
      await renameChannel(payload, notify);
      onHide();
      formik.resetForm();
    },
  });
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentchannel?.name, isOpened]);

  return (
    <Modal
      show={isOpened}
      onHide={onHide}
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
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Form.Text className="text-danger">
              {formik.touched.channelName && formik.errors.channelName ? (
                <div className="text-danger">{formik.errors.channelName}</div>
              ) : null}
            </Form.Text>
          </Form.Group>
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
              variant="primary"
              type="submit"
            >
              {t('chat.modals.renameChannel')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
