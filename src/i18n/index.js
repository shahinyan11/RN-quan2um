import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import AsyncStorageBackend from 'i18next-async-storage-backend';
import {getData} from '@utils/asyncStorage';
import {store} from '@store/index';

const fallbackLng = 'en';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const locale = await getData('@app_language');
    callback(locale || fallbackLng);
  },
  cacheUserLanguage: () => {},
};

const i18nOptions = {
  backend: {
    backends: [AsyncStorageBackend, HttpBackend],
    backendOptions: [
      {
        expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      {
        loadPath: `${store.getState().app.baseUrl}/translates/{{lng}}`,
        allowMultiLoading: false,
        crossDomain: false,
      },
    ],
  },
  debug: false,
  nsSeparator: '__',
  returnObjects: false,
  fallbackLng: ['en', 'ru'],
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

let currentValue;
const updateLoadPath = () => {
  let previousValue = currentValue;
  currentValue = store.getState().app.baseUrl;

  if (previousValue !== currentValue) {
    const loadPath = `${currentValue}/translates/{{lng}}`;
    i18nOptions.backend.backendOptions[1].loadPath = loadPath;

    i18n.reloadResources();
  }
};

const initializeI18n = () => {
  i18n
    .use(languageDetector)
    .use(ChainedBackend)
    .use(initReactI18next)
    .init(i18nOptions)
    .then();
};

store.subscribe(updateLoadPath);

initializeI18n();

export default i18n;
