import axios from 'axios';
import routes from '../../../utils/routes';

const handleLogin = async (formikObj, t) => {
  try {
    const response = await axios.post(routes.login, {
      username: formikObj.values.nickname,
      password: formikObj.values.password,
    });

    if (response.status === 200) {
      return response;
    }
  } catch (e) {
    const errors = {};
    if (e.code === 'ERR_BAD_REQUEST') errors.password = t('login.errors.wrongCredentials');
    else errors.password = t('general.errors.badNetwork');
    formikObj.setErrors(errors);
  }

  return null;
};

export default handleLogin;
