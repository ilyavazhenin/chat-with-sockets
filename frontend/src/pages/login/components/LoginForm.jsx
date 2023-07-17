import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../../../slices/userSlice';
import handleLogin from '../utils/handleLogin';

const LoginForm = () => {
  const { t } = useTranslation();
  const nameRef = useRef();
  const navigate = useNavigate();
  const requiredError = t('general.errors.requiredField');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .required(requiredError),
      password: Yup.string()
        .required(requiredError),
    }),
    onSubmit: async () => {
      const user = await handleLogin(formik, t);
      if (user?.token) {
        dispatch(actions.addCurrentUser(user));
        navigate('/');
      }
    },
  });

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formNickname">
        <Form.Label>{t('login.nickname')}</Form.Label>
        <Form.Control
          type="text"
          name="nickname"
          ref={nameRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}
        />

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
          value={formik.values.password}
        />

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
