import api, {COUNTRIES, LANGUAGES} from '@api';
import {IPayload} from '@store/types';
import i18n from 'i18next';
import axios from 'axios';
import {IApp, ICountries, ICurrency, ILanguage, SET_VALUE} from './types';
import {
  SET_BASE_URL,
  SET_COUNTRIES,
  SET_SECURE_PASSWORD,
  SET_TFA_SKIPPED,
  SET_UNLOCK_DATE,
} from '../reducerTypes';

const setValue = (payload: IPayload<IApp>) => ({
  type: SET_VALUE,
  payload,
});

export const setLanguage = (data: ILanguage) => ({
  type: SET_VALUE,
  payload: {
    field: 'language',
    data,
  },
});

export const setCurrency = (data: ICurrency) => ({
  type: SET_VALUE,
  payload: {
    field: 'currency',
    data,
  },
});

export const setAppPassword = (data: string) => ({
  type: SET_VALUE,
  payload: {
    field: 'appPassword',
    data,
  },
});

export const setMessageVisible = (visible: boolean) => ({
  type: SET_VALUE,
  payload: {
    field: 'isMessageVisible',
    data: visible,
  },
});

export const onErrorMessage = (message: string) => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'message',
      data: {
        title: i18n.t('common.m_error_title'),
        message,
        type: 'error',
      },
    }),
  );

  dispatch(setMessageVisible(true));

  setTimeout(() => {
    dispatch(onClearMessage());
  }, 5000);
};

export const onAlertMessage = (message: string) => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'message',
      data: {
        title: i18n.t('common.m_alert_title'),
        message,
        type: 'alert',
      },
    }),
  );

  dispatch(setMessageVisible(true));

  setTimeout(() => {
    dispatch(onClearMessage());
  }, 5000);
};

export const onSuccessMessage = (message: string) => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'message',
      data: {
        title: i18n.t('common.m_success_title'),
        message,
        type: 'success',
      },
    }),
  );
  dispatch(setMessageVisible(true));

  setTimeout(() => {
    dispatch(onClearMessage());
  }, 5000);
};

export const onClearMessage = () => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'message',
      data: {
        title: '',
        message: '',
        type: 'success',
      },
    }),
  );

  dispatch(setMessageVisible(false));
};

export const onLoadLanguages = () => (dispatch: any) => {
  api.get(LANGUAGES).then(({data}) => {
    dispatch(setValue({field: 'languages', data}));
  });
};

export const onChangeSecureMode = (visible: boolean) => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'isSecure',
      data: visible,
    }),
  );
};

export const setUnlockDate = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_UNLOCK_DATE,
    payload: data,
  });
};

export const setSecurePassword = (data: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_SECURE_PASSWORD,
    payload: data,
  });
};

export const getCountries = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(COUNTRIES);
    dispatch(setCountries(data));
  } catch (e: any) {
    console.log('getCountries', e.response);
  }
};

export const checkUrlValidity =
  ({url, onSuccess}) =>
  async (dispatch: any) => {
    try {
      await axios.get(`${url}/market`);
      dispatch(setBaseUrl(url));
      onSuccess?.();
    } catch (e: any) {
      dispatch(onErrorMessage(i18n.t('URL-адрес недействителен')));
      // console.log('checkUrlValidity', e.response);
    }
  };

export const setCountries = (data: ICountries[]) => ({
  type: SET_COUNTRIES,
  payload: data,
});

export const setBaseUrl = (url: string) => ({
  type: SET_BASE_URL,
  payload: url,
});

export const setTfaSkipped = (data: boolean) => ({
  type: SET_TFA_SKIPPED,
  payload: data,
});
