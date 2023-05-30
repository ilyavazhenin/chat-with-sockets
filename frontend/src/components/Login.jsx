import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';

function LoginCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="assets/chat-box.png" />
      <Card.Body>
        <Card.Title>
          <h2>Войти</h2>
        </Card.Title>
        <LoginForm />
        <p>Нет аккаунта?</p>
        <a href="/#">Регистрация</a>
      </Card.Body>
    </Card>
  );
}

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formNickname">
        <Form.Label>Ваш ник</Form.Label>
        <Form.Control 
          type="text"
          name="nickname" 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password} />
      </Form.Group>
      
      
      <Button variant="outline-primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};


export default LoginCard;

// export default Login;
