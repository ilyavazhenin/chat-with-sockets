import axios from 'axios';
import routes from '../../../utils/routes';

const handleReg = async (formikObj, setUser, navigate, t) => {
  try {
    const response = await axios.post(routes.signup, {
      username: formikObj.values.nickname,
      password: formikObj.values.password,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userName', formikObj.values.nickname);

    if (response.status === 201) {
      setUser({
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('token'),
      });
      navigate('/');
    }
  } catch (e) {
    setUser(null);
    const errors = {};
    if (e.response.status === 409) errors.nickname = t('signup.errors.userExists');
    else errors.nickname = t('general.errors.badNetwork');
    formikObj.setErrors(errors);
  }
};

export default handleReg;
