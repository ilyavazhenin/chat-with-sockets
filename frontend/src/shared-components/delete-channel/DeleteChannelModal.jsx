/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import notify from '../../utils/toast-notifier';
import socket from '../../utils/socket-init';
import useSocket from '../../hooks/useSocket';

const DeleteChannelModal = (props) => {
  const { removeChannel } = useSocket(socket);
  const { t } = useTranslation();

  const {
    show, onHide, channelId,
  } = props;

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    await removeChannel({ id }, notify);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('chat.modals.areYouSure')}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          {t('chat.modals.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete(channelId)}
        >
          {t('chat.modals.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
