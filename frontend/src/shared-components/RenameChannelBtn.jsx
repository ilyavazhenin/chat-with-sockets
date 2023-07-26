import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as modalsActions } from '../slices/modalsSlices';

const RenameChannelButton = (props) => {
  const { t } = useTranslation();
  const { channelId } = props;
  const dispatch = useDispatch();

  const RenameChannelModalConfig = {
    title: t('chat.modals.renameChannel'),
    actionButton: t('chat.modals.send'),
    actionVariant: 'primary',
    fieldsShow: true,
    modalType: 'rename',
    channelId,
  };

  const openRenameChannelModal = () => {
    dispatch(modalsActions.showModal(RenameChannelModalConfig));
  };

  return (
    <button
      onClick={() => openRenameChannelModal()}
      type="button"
      className="p-0 text-primary btn btn-group-vertical w-100"
    >
      {t('chat.renameChannel')}
    </button>
  );
};

export default RenameChannelButton;
