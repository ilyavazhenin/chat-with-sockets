import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DeleteChannelModal from './DeleteChannelModal';

const DeleteChannelBtn = (props) => {
  const { t } = useTranslation();

  const { channelId, socket } = props;
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        type="button"
        className="p-0 text-danger btn btn-group-vertical w-100"
      >
        {t('chat.deleteChannel')}
      </button>
      <DeleteChannelModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        channelId={channelId}
        socket={socket}
      />
    </>
  );
};

export default DeleteChannelBtn;
