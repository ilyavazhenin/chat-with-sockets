import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as modalsActions } from '../slices/modalsSlices';

const DeleteChannelBtn = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelId } = props;

  const deleteChannelModalConfig = {
    title: t('chat.modals.deleteChannel'),
    bodyText: t('chat.modals.areYouSure'),
    actionButton: t('chat.modals.delete'),
    actionVariant: 'danger',
    fieldShow: false,
    modalType: 'delete',
    channelId,
  };

  const openDeleteChannelModal = () => {
    dispatch(modalsActions.showModal(deleteChannelModalConfig));
  };

  return (
    <button
      onClick={() => openDeleteChannelModal()}
      type="button"
      className="p-0 text-danger btn btn-group-vertical w-100"
    >
      {t('chat.deleteChannel')}
    </button>
  );
};

export default DeleteChannelBtn;
