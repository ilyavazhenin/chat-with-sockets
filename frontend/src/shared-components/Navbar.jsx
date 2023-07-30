import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUser from '../hooks/useUser';
import { appRoutes } from '../utils/routes';

const Navbar = () => {
  const { t } = useTranslation();
  const currentLocation = useLocation();
  const { logoutUser } = useUser();
  const { loginUrl, signupUrl } = appRoutes;
  const { pathname } = currentLocation;

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white position-fixed w-100">
      <div className="container">
        <a className="navbar-brand" href="/">{t('general.appNameLogo')}</a>
        {
        (pathname === loginUrl || pathname === signupUrl)
          ? null
          : <button type="button" className="btn btn-primary" onClick={logoutUser}>{t('general.logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
