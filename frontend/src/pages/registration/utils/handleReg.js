import axios from 'axios';
import routes from '../../../utils/routes';

const handleReg = async (formikObj, t) => {
  try {
    const response = await axios.post(routes.signup, {
      username: formikObj.values.nickname,
      password: formikObj.values.password,
    });

    if (response.status === 201) {
      const { token } = response.data;
      const userName = formikObj.values.nickname;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      return response;
    }
  } catch (e) {
    const errors = {};
    if (e.response.status === 409) errors.nickname = t('signup.errors.userExists');
    else errors.nickname = t('general.errors.badNetwork');
    formikObj.setErrors(errors);
  }

  return null;
};

export default handleReg;
