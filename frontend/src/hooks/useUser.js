import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../slices/userSlice';

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
    navigate('/login');
  };

  return ({
    currentUser,
    setUser,
    logoutUser,
  });
};

export default useUser;
