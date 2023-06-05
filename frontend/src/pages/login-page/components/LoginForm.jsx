import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../utils/auth-context';

//TODO: вынести в утилс и возможно сделать через юзэффект

const LoginForm = () => {

  const { setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

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
        .min(5, "Пароль должен состоять минимум из 5 символов")
        .max(20, "Никнейм должен быть не длиннее 20 символов")
        .required("Обязательно к заполнению"),
    }),
    onSubmit: async (values) => {
      //TODO: вынести потом в отдельную функцию в утилс:
      try {
        const response = await axios.post('/api/v1/login', { 
          username: formik.values.nickname,
          password: formik.values.password,
        } );
        //TODO: почистить консольлоги
        console.log(JSON.stringify(values, null, 2));
        console.log(response, 'response');
        console.log(response.data, 'resp data');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', formik.values.nickname);
  
        if (response.status === 200) {
          setUser({userName: localStorage.getItem('userName')});
          navigate('/');
        }
      } catch (e) {
        setUser(null);
        console.log(e, 'E')
        const errors = {};
        if (e.code === 'ERR_BAD_REQUEST') errors.password = 'Неверное имя пользователя или пароль';
        else errors.password = 'Ошибка сети, попробуйте еще раз';
        formik.setErrors(errors);
      } 
    },
  });

  

  // useEffect(() => {
  //   redirectOnAuth();
  // });

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