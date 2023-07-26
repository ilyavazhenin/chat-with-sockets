import { useSelector, useDispatch } from 'react-redux';
import { actions as modalsActions } from '../../slices/modalsSlices';
import Add from './Add';
import Delete from './Delete';
import Rename from './Rename';

const modals = {
  addChannel: Add,
  deleteChannel: Delete,
  renameChannel: Rename,
};

const UnitedModal = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.modals);
  const CurrentModal = modals[modalType];

  return (
    <div>
      {CurrentModal && <CurrentModal onHide={() => dispatch(modalsActions.closeModal())} />}
    </div>
  );
};

export default UnitedModal;
