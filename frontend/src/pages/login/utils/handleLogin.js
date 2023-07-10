import axios from 'axios';
import routes from '../../../utils/routes';

const handleLogin = async (formikObj, setUser, navigate, t) => {
  try {
    const response = await axios.post(routes.login, {
      username: formikObj.values.nickname,
      password: formikObj.values.password,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userName', formikObj.values.nickname);

    if (response.status === 200) {
      setUser({
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('token'),
      });
      navigate('/');
    }
  } catch (e) {
    setUser(null);
    const errors = {};
    if (e.code === 'ERR_BAD_REQUEST') errors.password = t('login.errors.wrongCredentials');
    else errors.password = t('general.errors.badNetwork');
    formikObj.setErrors(errors);
  }
};

export default handleLogin;
