import { useDispatch, useSelector } from 'react-redux';
import { actions, userSelectors } from '../slices/userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  // if (!userFromStore.token) {
  const userFromLocalStorage = { // if there is no user in state, but there is one in LS
    id: 1,
    userName: localStorage.getItem('userName'),
    token: localStorage.getItem('token'),
  };

  const setUser = (user) => dispatch(actions.addCurrentUser(user));
  const currentUser = useSelector((state) => userSelectors.selectById(state, 1));

  return ({
    currentUser: currentUser ?? userFromLocalStorage,
    setUser,
  });
};

export default useUser;
