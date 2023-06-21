import CurrentUserContext from '../../../utils/auth-context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { setUser } = useContext(CurrentUserContext);
  const currentLocation = useLocation();
  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    setUser({ userName: null, token: null });
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
        (currentLocation.pathname === '/login' || currentLocation.pathname === '/signup') ?
        null :
        <button type="button" className="btn btn-primary" onClick={logout}>Выйти</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
