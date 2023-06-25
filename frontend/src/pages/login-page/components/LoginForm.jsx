import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../../utils/auth-context';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();

  const { setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .required(t('general.errors.requiredField')),
      password: Yup.string()
        .required(t('general.errors.requiredField')),
    }),
    onSubmit: async (values) => {
      //TODO: вынести потом в отдельную функцию в утилс:
      try {
        const response = await axios.post('/api/v1/login', { 
          username: formik.values.nickname,
          password: formik.values.password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', formik.values.nickname);
  
        if (response.status === 200) {
          setUser({ 
            'userName': localStorage.getItem('userName'),
            'token': localStorage.getItem('token'),
         });
          navigate('/');
        }
      } catch (e) {
        setUser(null);
        const errors = {};
        if (e.code === 'ERR_BAD_REQUEST') errors.password = t('login.errors.wrongCredentials');
        else errors.password = t('general.errors.badNetwork');
        formik.setErrors(errors);
      } 
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formNickname">
        <Form.Label>{t('login.nickname')}</Form.Label>
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
        <Form.Label>{t('login.password')}</Form.Label>
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
      
      
      <Button variant="outline-primary" type="submit" className="float-end mt-2">
      {t('login.signin')}
      </Button>
    </Form>
  );
};

export default LoginForm;