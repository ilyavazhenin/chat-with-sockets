import { useTranslation } from 'react-i18next';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlices';
import UniversalModal from './UniversalModal.jsx';

// import RenameChannelModal from './RenameChannelModal';

const RenameChannelButton = (props) => {
  const { t } = useTranslation();
  const { channelId } = props;
  const channels = useSelector(selectors.selectAll);
  const currentchannel = channels.find((el) => el.id === channelId);
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals);

  const RenameChannelModalConfig = {
    title: t('chat.modals.renameChannel'),
    actionButton: t('chat.modals.send'),
    actionVariant: 'primary',
    fieldsShow: true,
    modalType: 'rename',
    currentchannel,
  };

  const openRenameChannelModal = () => {
    dispatch(modalsActions.showModal(RenameChannelModalConfig));
  };

  return (
    <>
      <button
        onClick={() => openRenameChannelModal()}
        type="button"
        className="p-0 text-primary btn btn-group-vertical w-100"
      >
        {t('chat.renameChannel')}
      </button>
      <UniversalModal
        show={modalState.isOpened}
        onHide={() => dispatch(modalsActions.closeModal(modalState))}
      />
    </>
  );
};

export default RenameChannelButton;
