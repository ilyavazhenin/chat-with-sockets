import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal'; // TODO: вынести модалку подтверждения в отдельный компонент
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenameChannelButton from './RenameChannelModal.jsx';
import socket from '../../../utils/socket-init';

const ChannelControlBtn = (props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    await socket.emit('removeChannel', { id });
    // TODO: добавить отслеживание ошибки, елси не получилось удалить канал
  };

  const { active, channelId } = props;

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant={active ? 'secondary' : 'light'}
          id="dropdown-basic"
          className="rounded-0"
        >
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow}>
            {t('chat.deleteChannel')}
          </Dropdown.Item>

          <Dropdown.Item>
            <RenameChannelButton channelId={channelId} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        show={show}
        onHide={handleClose}
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
            onClick={handleClose}
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
    </>
  );
};

export default ChannelControlBtn;
