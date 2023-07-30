import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import LoginForm from './components/LoginForm';

const LoginCard = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row" style={{ maxWidth: '590px' }}>
        <div className="col">
          <Card>
            <Card.Body>
              <div className="row align-items-center">
                <div className="col">
                  <Card.Img variant="top" src="assets/chat-box.png" className="login-img" />
                </div>
                <div className="col w-100">
                  <Card.Title>
                    <h2>{t('login.header')}</h2>
                  </Card.Title>
                  <LoginForm />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div>
                <div>{t('login.noAcc')}</div>
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
