import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({ children }) => {
  const user = useUser();

  return (
    user?.token ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
