import { useDispatch, useSelector } from 'react-redux';
import { actions, userSelectors } from '../slices/userSlice';

const useUser = (userData = undefined) => { // put user into userSlice or returns existed one
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => userSelectors.selectById(state, 1));

  if (!currentUser) {
    currentUser = {
      id: 1,
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
    };
  }

  if (userData !== undefined) {
    dispatch(actions.addCurrentUser(userData));
    return userData;
  }
  return currentUser;
};

export default useUser;
