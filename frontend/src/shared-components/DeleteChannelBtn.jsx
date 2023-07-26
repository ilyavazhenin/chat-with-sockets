import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as modalsActions } from '../slices/modalsSlices';

const DeleteChannelBtn = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channelId } = props;

  return (
    <button
      onClick={() => dispatch(modalsActions.showModal({ modalType: 'deleteChannel', channelId }))}
      type="button"
      className="p-0 text-danger btn btn-group-vertical w-100"
    >
      {t('chat.deleteChannel')}
    </button>
  );
};

export default DeleteChannelBtn;
