import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/channelsSlice.js';

import RenameChannelModal from './RenameChannelModal';

const RenameChannelButton = (props) => {
  const { t } = useTranslation();
  const { channelId } = props;
  const [modalShow, setModalShow] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const currentChannel = channels.find((el) => el.id === channelId);
  const channelsNames = channels.map((channel) => channel.name);

  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        type="button"
        className="p-0 text-primary btn btn-group-vertical w-100"
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
