import axios, {AxiosError} from 'axios';
import {onErrorMessage} from '@store/app';
import {onLogout, onRefreshToken, setDowntime} from '@store/auth';
import {IStore} from '@store/types';

import {
  USER_LOGIN,
  USER_REGISTRATION,
  USER_SEND_CODE,
  USER_VERIFICATION_CODE,
} from './routes';
import Config from 'react-native-config';
import {showModal} from '@store/modal';

const Api = axios.create({
  baseURL: Config.BASE_URL,
  // baseURL: 'https://api.dev.qn2m.com/api',
});

const BLACK_LIST = [
  USER_LOGIN,
  USER_REGISTRATION,
  USER_SEND_CODE,
  USER_VERIFICATION_CODE,
];

let isRefreshing = false;
let failedQueue = [] as any[];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const axiosMiddleware =
  ({getState, dispatch}: {getState: () => IStore; dispatch: any}) =>
  (next: any) =>
  (action: any) => {
    Api.interceptors.request.use(
      config => {
        config.baseURL = getState().app.baseUrl;
        // config.baseURL = 'https://api.dev.qn2m.com/api';

        const token = getState().auth.user?.access_token;
        const language = getState().app.language;
        const isDowntime = getState().auth.isDowntime;

        if (isDowntime) {
          dispatch(setDowntime(false));
        }

        if (
          token &&
          !config.headers.Authorization &&
          !BLACK_LIST.includes(config?.url)
        ) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.language = language.locale;

        return config;
      },
      error => {
        // handle the error
        return Promise.reject(error);
      },
    );

    next(action);
  };

export const globalInterceptor = (store: {
  getState: () => IStore;
  dispatch: any;
}) => {
  const {dispatch} = store;

  Api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError<any>) => {
      const originalRequest = error.config;
      const reqData = JSON.parse(originalRequest.data);
      const errors: object | undefined = error.response?.data.errors;

      if (!error.response) {
        return;
      }

      const showTfa =
        errors?.hasOwnProperty('tfa_code') &&
        !reqData.hasOwnProperty('tfa_code');
      const showEmail =
        errors?.hasOwnProperty('email_code') &&
        !reqData.hasOwnProperty('email_code');
      const showPhone =
        errors?.hasOwnProperty('phone_code') &&
        !reqData.hasOwnProperty('email_code');

      if (showTfa || showEmail || showPhone) {
        dispatch(
          showModal({
            modalType: 'IDENTIFICATION_CHECK',
            modalProps: {
              showTfa,
              showEmail,
              showPhone,
              onConfirm: ({tfa_code, email_code, phone_code}: any) => {
                reqData.tfa_code = tfa_code || undefined;
                reqData.email_code = email_code || undefined;
                reqData.phone_code = phone_code || undefined;

                originalRequest.data = JSON.stringify(reqData);

                Api(originalRequest);
              },
            },
          }),
        );

        return; // Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({resolve, reject});
          })
            .then(token => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              return axios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          dispatch(onRefreshToken())
            .then(({access_token}) => {
              originalRequest.headers.Authorization = 'Bearer ' + access_token;
              processQueue(null, access_token);
              resolve(axios(originalRequest));
            })
            .catch(err => {
              dispatch(onLogout());
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else if (error.response?.status === 401 && originalRequest._retry) {
        dispatch(onLogout());
      } else if (error.response?.status === 503) {
        dispatch(setDowntime(true));
      } else if (error.response?.status !== 418) {
        let message = error.response?.data.message;
        const code = error.response?.data.code;

        if (errors) {
          message = Object.values(errors)
            .map(err => err.join('\n'))
            .join('\n');
        }

        if (code !== 'tfa') {
          dispatch(onErrorMessage(message));
        }
      }

      return Promise.reject(error);
    },
  );
};

export * from './routes';

export default Api;
