import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../../../slices/userSlice';
import handleReg from '../utils/handleReg';
import { registerSchema } from '../../../utils/yup-schemas';

const RegisterForm = () => {
  const { t } = useTranslation();
  const nameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema(),
    onSubmit: async () => {
      const user = await handleReg(formik, t);
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
        <Form.Label>{t('signup.nickname')}</Form.Label>
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
        <Form.Label>{t('signup.password')}</Form.Label>
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

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>{t('signup.confirmPassword')}</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />

        <Form.Text className="text-danger">
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-danger">{formik.errors.confirmPassword}</div>
          ) : null}
        </Form.Text>

      </Form.Group>

      <Button variant="outline-primary" type="submit" className="float-end mt-2">
        {t('signup.signup')}
      </Button>
    </Form>
  );
};

export default RegisterForm;
