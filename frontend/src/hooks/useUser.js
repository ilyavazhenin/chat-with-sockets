import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../slices/userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userFromLocalStorage = { // if there is no user in state, but there is one in LS
    userName: localStorage.getItem('userName'),
    token: localStorage.getItem('token'),
  };

  const setUser = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('userName', user.userName);
    dispatch(actions.addCurrentUser(user));
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser({ userName: null, token: null });
    navigate('/login');
  };

  const currentUser = useSelector((state) => state.user);

  return ({
    currentUser: currentUser ?? userFromLocalStorage,
    setUser,
    logoutUser,
  });
};

export default useUser;
