import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import Cookies from 'js-cookie';
import vi from './lang/vi.json';

i18n
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      // vi: {
      //   translation: vi
      // },
    //   en: {
    //       translation: {
    //           Password : 'abc'
    //       }
    //   }
    },
    lng: 'en',
    // debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;