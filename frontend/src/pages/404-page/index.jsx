import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img className="w-50" src="assets/page-404.svg" alt="page not found"/>
      <h1>{t('page404.pageNotFound')}</h1>
      <p>{t('page404.goTo')}<a href="/">Главную страницу</a></p>
    </div>
  );
};

export default NotFound;