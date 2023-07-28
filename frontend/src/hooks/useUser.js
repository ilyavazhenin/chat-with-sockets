import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../slices/userSlice';
import { appRoutes } from '../utils/routes';

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);

  const setUser = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('userName', user.userName);
    dispatch(actions.addCurrentUser(user));
  };

  const logoutUser = () => {
    localStorage.clear();
    navigate(appRoutes.loginUrl);
  };

  return ({
    currentUser,
    setUser,
    logoutUser,
  });
};

export default useUser;
