import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import RegisterForm from './components/RegisterForm';

const RegisterCard = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row" style={{ maxWidth: '590px' }}>
        <div className="col">
          <Card>
            <Card.Body>
              <div className="row align-items-center">
                <div className="col">
                  <Card.Img variant="top" src="assets/sign-up.svg" />
                </div>
                <div className="col w-100">
                  <Card.Title>
                    <h2>{t('signup.header')}</h2>
                  </Card.Title>
                  <RegisterForm />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div>
                <div>{t('signup.alreadySignedUp')}</div>
                <a href="/login">{t('signup.signin')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
