import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.js';

const resources = { ru };

export const i18inst = i18n.createInstance();

await i18inst
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default resources;
