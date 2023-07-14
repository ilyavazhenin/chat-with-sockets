import { useDispatch, useSelector } from 'react-redux';
import { actions, userSelectors } from '../slices/userSlice';

const useUser = (userData = undefined) => { // put user into userSlice or returns existed one
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => userSelectors.selectById(state, 1));
  console.log(userData, 'USER DATA IN hook');
  console.log(currentUser, 'currentUser in hook');
  if (userData !== undefined) {
    dispatch(actions.addCurrentUser(userData));
    return userData;
  }
  return currentUser;
};

export default useUser;
