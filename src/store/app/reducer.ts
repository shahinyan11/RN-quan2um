import Config from 'react-native-config';

import {LOGOUT} from '@store/auth/types';
import {IAction, IPayload} from '@store/types';
import {IApp, SET_VALUE} from './types';
import {
  SET_BASE_URL,
  SET_COUNTRIES,
  SET_SECURE_PASSWORD,
  SET_TFA_SKIPPED,
  SET_UNLOCK_DATE,
} from '../reducerTypes';

const initState: IApp = {
  isMessageVisible: false,
  isSecure: false,
  appPassword: '',
  message: {
    title: '',
    message: '',
    type: 'success',
  },
  language: {
    id: 1,
    locale: 'en',
    title: 'Eng',
    is_default: true,
  },
  languages: [],
  currency: {
    id: 0,
    name: 'usd',
    title: 'USD',
  },
  unlockDate: Date.now(),
  isSetSecurePass: false,
  countries: [],
  baseUrl: Config.BASE_URL,
  tfaSkipped: false,
};

const appReducer = (state = initState, action: IAction<IPayload<IApp>>) => {
  const {type, payload} = action;
  switch (type) {
    case SET_VALUE: {
      const {field, data} = payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isSecure: false,
        tfaSkipped: false,
        appPassword: '',
      };
    }
    case SET_UNLOCK_DATE:
      return {
        ...state,
        unlockDate: payload,
      };
    case SET_SECURE_PASSWORD:
      return {
        ...state,
        isSetSecurePass: payload,
      };
    case SET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case SET_BASE_URL:
      return {
        ...state,
        baseUrl: payload,
      };
    case SET_TFA_SKIPPED:
      return {
        ...state,
        tfaSkipped: payload,
      };
    default:
      return state;
  }
};

export default appReducer;
