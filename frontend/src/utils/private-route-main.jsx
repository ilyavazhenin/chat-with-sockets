import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    currentUser?.token ? children : navigate('/login')
  );
};

export default PrivateRoute;
