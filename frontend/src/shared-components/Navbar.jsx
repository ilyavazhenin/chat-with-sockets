import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUser from '../hooks/useUser';

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLocation = useLocation();
  const { setUser } = useUser();

  const logout = () => {
    localStorage.clear();
    setUser({ userName: null, token: null });
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('general.appNameLogo')}</a>
        {
        (currentLocation.pathname === '/login' || currentLocation.pathname === '/signup')
          ? null
          : <button type="button" className="btn btn-primary" onClick={logout}>{t('general.logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
