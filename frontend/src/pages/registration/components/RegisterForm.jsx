import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CurrentUserContext from '../../../utils/auth-context';
import handleReg from '../utils/handleReg';

const RegisterForm = () => {
  const { t } = useTranslation();
  const nameRef = useRef();
  const { setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const requiredError = t('general.errors.requiredField');
  const from3to20symbError = t('signup.errors.from3to20symbls');

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .min(3, from3to20symbError)
        .max(20, from3to20symbError)
        .required(requiredError),
      password: Yup.string()
        .min(6, t('signup.errors.noLessThan6symbls'))
        .required(requiredError),
      confirmPassword: Yup.string()
        .required(requiredError)
        .oneOf([Yup.ref('password')], t('signup.errors.pswrdsMustMatch')),
    }),
    onSubmit: async () => handleReg(formik, setUser, navigate, t),
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
