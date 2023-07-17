import { useDispatch, useSelector } from 'react-redux';
import { actions, userSelectors } from '../slices/userSlice';

const useUser = (userData = undefined) => { // put user into userSlice or/and returns existed one
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => userSelectors.selectById(state, 1));

  if (!currentUser) { // if no user to set, get current one from Storage
    currentUser = {
      id: 1,
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
    };
  }

  const setUser = (user) => dispatch(actions.addCurrentUser(user));

  if (userData !== undefined) {
    dispatch(actions.addCurrentUser(userData));
    return userData;
  }
  return ({
    currentUser,
    setUser,
  });
};

export default useUser;
