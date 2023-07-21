import { Navigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useUser();

  return (
    currentUser?.token ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
