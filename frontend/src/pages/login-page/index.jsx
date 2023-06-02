import Card from 'react-bootstrap/Card';
import LoginForm from './components/LoginForm';

const LoginCard = () => {
  return (
    <div class="my-2 d-flex justify-content-center bg-light">
      <div class="row align-items-start">
        <div class="col">
          <Card>
            <Card.Body>
              <div class="row">
                <div class="col">
                  <Card.Img variant="top" src="assets/chat-box.png" />
                </div>
                <div class="col">
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