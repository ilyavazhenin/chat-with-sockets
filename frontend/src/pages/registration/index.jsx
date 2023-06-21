import Card from 'react-bootstrap/Card';
import RegisterForm from './components/RegisterForm';

const RegisterCard = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row" style={{ maxWidth: "590px" }}>
        <div className="col">
          <Card>
            <Card.Body>
              <div className="row align-items-center">
                <div className="col">
                  <Card.Img variant="top" src="assets/sign-up.svg"/>
                </div>
                <div className="col w-100">
                  <Card.Title>
                    <h2>Регистрация</h2>
                  </Card.Title>
                  <RegisterForm/>
                </div>
              </div>
            </Card.Body>
              <Card.Footer>
                  <div>
                    <div>Уже есть аккаунт?</div>
                    <a href="/login">Войти</a> 
                  </div>
              </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
