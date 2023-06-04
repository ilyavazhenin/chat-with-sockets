import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../utils/auth-context';

const Main = () => {
  const navigate = useNavigate();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!user.userName) navigate('/login');
  });
  
  return (
    <div>
      <h1>Logged in! Success!</h1>
      <p>Here's the main page when you are authorized</p>
    </div>
  );
};

export default Main;
