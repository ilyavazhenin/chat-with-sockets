import * as Yup from 'yup';
import { i18inst } from '../i18n';

const addChannelSchema = (existedChannels) => Yup.object({
  channelName: Yup.string()
    .min(3, i18inst.t('chat.errors.from3to20symbls'))
    .max(20, i18inst.t('general.errors.requiredField'))
    .required(i18inst.t('general.errors.requiredField'))
    .notOneOf(existedChannels, i18inst.t('chat.errors.uniqueChannel')),
});

const registerSchema = () => Yup.object({
  nickname: Yup.string()
    .min(3, i18inst.t('chat.errors.from3to20symbls'))
    .max(20, i18inst.t('chat.errors.from3to20symbls'))
    .required(i18inst.t('general.errors.requiredField')),
  password: Yup.string()
    .min(6, i18inst.t('signup.errors.noLessThan6symbls'))
    .required(i18inst.t('general.errors.requiredField')),
  confirmPassword: Yup.string()
    .required(i18inst.t('general.errors.requiredField'))
    .oneOf([Yup.ref('password')], i18inst.t('signup.errors.pswrdsMustMatch')),
});

export { addChannelSchema, registerSchema };
