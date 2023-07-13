import * as Yup from 'yup';
import { i18inst } from '../i18n';

const from3to20symbError = i18inst.t('chat.errors.from3to20symbls');
const requiredError = i18inst.t('general.errors.requiredField');

const addChannelSchema = (existedChannels) => Yup.object({
  channelName: Yup.string()
    .min(3, from3to20symbError)
    .max(20, from3to20symbError)
    .required(i18inst.t('general.errors.requiredField'))
    .notOneOf(existedChannels, i18inst.t('chat.errors.uniqueChannel')),
});

const registerSchema = () => Yup.object({
  nickname: Yup.string()
    .min(3, from3to20symbError)
    .max(20, from3to20symbError)
    .required(requiredError),
  password: Yup.string()
    .min(6, i18inst.t('signup.errors.noLessThan6symbls'))
    .required(requiredError),
  confirmPassword: Yup.string()
    .required(requiredError)
    .oneOf([Yup.ref('password')], i18inst.t('signup.errors.pswrdsMustMatch')),
});

export { addChannelSchema, registerSchema };
