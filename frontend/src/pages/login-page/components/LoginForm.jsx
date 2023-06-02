import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .min(3, "Никнейм должен состоять минимум из 3 символов")
        .max(15, "Никнейм должен быть не длиннее 15 символов")
        .required("Обязательно к заполнению"),
      password: Yup.string()
        .min(6, "Пароль должен состоять минимум из 6 символов")
        .max(20, "Никнейм должен быть не длиннее 20 символов")
        .required("Обязательно к заполнению"),
    }),
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

          <Form.Text className="text-danger">
              {formik.touched.nickname && formik.errors.nickname ? (
                <div className="text-danger">{formik.errors.nickname}</div>
              ) : null}
          </Form.Text>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password} />

          <Form.Text className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
          </Form.Text>

      </Form.Group>
      
      
      <Button variant="outline-primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;