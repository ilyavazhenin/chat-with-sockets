import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as modalsActions } from '../slices/modalsSlices';

const RenameChannelButton = (props) => {
  const { t } = useTranslation();
  const { channelId } = props;
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(modalsActions.showModal({ modalType: 'renameChannel', channelId }))}
      type="button"
      className="p-0 text-primary btn btn-group-vertical w-100"
    >
      {t('chat.renameChannel')}
    </button>
  );
};

export default RenameChannelButton;
