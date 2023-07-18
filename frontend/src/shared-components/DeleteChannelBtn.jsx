import { useTranslation } from 'react-i18next';
import { useState } from 'react';
// import DeleteChannelModal from './DeleteChannelModal';
import UniversalModal from './UniversalModal';

const DeleteChannelBtn = (props) => {
  const { t } = useTranslation();

  const { channelId } = props;
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
      <UniversalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentchannel={channelId}
        modalType="delete"
      />
    </>
  );
};

export default DeleteChannelBtn;
