import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { selectors } from '../../slices/channelsSlice';
import notify from '../../utils/toast-notifier';
import useSocket from '../../hooks/useSocket';
import SocketContext from '../../context/socket-context';

const DeleteModal = (props) => {
  const socketInstance = useContext(SocketContext);
  const { t } = useTranslation();
  const { removeChannel } = useSocket(socketInstance);
  const channels = useSelector(selectors.selectAll);
  const modalState = useSelector((state) => state.modals);
  const { isOpened, channelId } = modalState;
  const { id } = channels.find((el) => el.id === channelId);
  const { onHide } = props;

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeChannel({ id }, notify);
    onHide();
  };

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
          {t('chat.modals.deleteChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('chat.modals.areYouSure')}
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
            variant="danger"
            onClick={handleDelete}
          >
            {t('chat.modals.delete')}
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
