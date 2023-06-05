import Card from 'react-bootstrap/Card';
import LoginForm from './components/LoginForm';

const LoginCard = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row" style={{ maxWidth: "590px" }}>
        <div className="col">
          <Card>
            <Card.Body>
              <div className="row">
                <div className="col">
                  <Card.Img variant="top" src="assets/chat-box.png" />
                </div>
                <div className="col w-100">
                  <Card.Title>
                    <h2>Войти</h2>
                  </Card.Title>
                  <LoginForm/>
                </div>
              </div>
            </Card.Body>
              <Card.Footer>
                  <div>
                    <div>Нет аккаунта?</div>
                    <a href="/#">Регистрация</a> 
                  </div>
              </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;