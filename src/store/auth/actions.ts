import api, {
  ACCOUNT_TFA_DISABLE,
  ACCOUNT_TFA_ENABLE,
  USER_BALANCE,
  USER_INFO,
  USER_LOGIN,
  USER_RECOVERY_PASSWORD,
  USER_REFRESH_TOKEN,
  USER_REGISTRATION,
  USER_RESET_PASSWORD_CODE,
  USER_SEND_CODE,
  USER_SOCIAL_LOGIN,
  USER_VERIFICATION_CHECK_CODE,
  USER_VERIFICATION_CODE,
  USER_VERIFICATION_RESEND_CODE,
} from '@api';

import {
  getNotificationBadgeSetting,
  setBadgeCount,
} from 'react-native-notification-badge';

import {onSuccessMessage} from '@store/app';
import {IPayload, IStore} from '@store/types';
import {
  IAuth,
  IUser,
  LOGOUT,
  SET_USER,
  SET_USER_BALANCE,
  SET_VALUE,
  UserBalance,
} from './types';
import {getFormData} from '@utils/index';
import {navigationRef} from '@navigation/index';
import {
  AppsFlyerLogEvent,
  AppsFlyerOnInstall,
  registration,
} from '@utils/appsflyer';
import {CHECK_SOCIAL_REGISTER, SET_DOWNTIME_SCREEN} from '../reducerTypes';

const setValue = (payload: IPayload<IAuth>) => ({
  type: SET_VALUE,
  payload,
});

const setUser = (payload: any) => ({
  type: SET_USER,
  payload,
});

const setLoading = (data: boolean = true) => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data,
  },
});

export const onActionLogout = () => ({
  type: LOGOUT,
});

export const setUserBalance = (payload: UserBalance) => ({
  type: SET_USER_BALANCE,
  payload,
});

export const onLogout = () => async (dispatch: any) => {
  try {
    dispatch(onActionLogout());

    const permission = await getNotificationBadgeSetting();

    if (permission === 'enabled') {
      await setBadgeCount(0);
    }
  } catch (e) {
    console.log(e);
  }
};

export const onSignIn =
  (
    config: {
      app: string;
      username: string;
      password: string;
      tfa_code?: string;
      'g-recaptcha-response': string;
    },
    onActionTFA?: () => void,
  ) =>
  (dispatch: any) => {
    dispatch(setLoading(true));

    api
      .post(USER_LOGIN, config)
      .then(({data}) => {
        dispatch(setUser(data));
        dispatch(setValue({field: 'isAuth', data: true}));
      })
      .catch(({response}) => {
        const {code} = response.data;
        if (code === 'tfa' && onActionTFA) {
          onActionTFA();
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onSendCode = (username: string) => async () => {
  try {
    const formData = new FormData();

    formData.append('username', username);

    await api.post(USER_SEND_CODE, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const onRecoveryPassword =
  ({
    data,
    onSuccess,
    onActionTFA,
  }: {
    data: {
      email?: string;
      phone?: string;
      tfa_code?: string;
      is_mobile: number;
    };
    onActionTFA?: () => void;
    onSuccess: () => void;
  }) =>
  (dispatch: any) => {
    dispatch(setLoading(true));
    const formData = getFormData(data);

    api
      .post(USER_RECOVERY_PASSWORD, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(() => {
        onSuccess();
      })
      .catch(({response}) => {
        const {code} = response.data;
        if (code === 'tfa' && onActionTFA) {
          onActionTFA();
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onRecoveryPasswordResend =
  ({email = '', phone = ''}: {email?: string; phone?: string}) =>
  async () => {
    const formData = getFormData({email, phone, is_mobile: 1});
    await api.post(USER_VERIFICATION_RESEND_CODE, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  };

export const onRecoveryPasswordCheckCode =
  ({
    data,
    onSuccess,
  }: {
    data: {
      code: string;
      email?: string;
      phone?: string;
    };
    onSuccess: () => void;
  }) =>
  (dispatch: any) => {
    dispatch(setLoading(true));
    const formData = getFormData(data);

    api
      .post(USER_VERIFICATION_CHECK_CODE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(() => {
        onSuccess();
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onRecoveryChangePassword =
  ({
    data,
  }: {
    data: {
      code: string;
      new_password: string;
      confirm_password: string;
      email?: string;
      phone?: string;
    };
  }) =>
  (dispatch: any) => {
    dispatch(setLoading(true));
    const formData = getFormData(data);
    api
      .post(USER_RESET_PASSWORD_CODE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(() => {
        navigationRef.current?.resetRoot({
          index: 0,
          routes: [{name: 'Auth'}],
        });

        dispatch(onSuccessMessage('Password successful restore'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onVerifyAccount =
  (data: {username: string; code: string}, onSuccess?: () => void) =>
  (dispatch: any) => {
    api.post(USER_VERIFICATION_CODE, data).then(({data: responseData}) => {
      if (onSuccess) {
        onSuccess();
      } else {
        dispatch(setUser(responseData));
        dispatch(setValue({field: 'isAuth', data: true}));
      }
    });
  };

export const onSignUp =
  (
    data: {
      app: 'app' | 'web';
      email?: string;
      password: string;
      confirm: number;
      confirm_password: number;
      country_id: number;
      'g-recaptcha-response': string;
    },
    onSuccess: () => void,
  ) =>
  () => {
    api.post(USER_REGISTRATION, data).then(() => {
      AppsFlyerLogEvent(registration, data);
      onSuccess();
    });
  };

export const getUserInfo = (onSuccess?: () => void) => (dispatch: any) => {
  api
    .get(USER_INFO)
    .then(({data}) => {
      dispatch(setUser(data));
    })
    .then(() => {
      if (onSuccess) {
        onSuccess();
      }
    })

    .catch(e => {
      console.log(e);
    });
};

export const onEnableTFA =
  (
    config: {code: string; secret: string},
    onSuccess: (value: string[]) => void,
  ) =>
  () => {
    api.post(ACCOUNT_TFA_ENABLE, config).then(({data}) => {
      onSuccess(data.reserve_codes);
    });
  };

export const onDisableTFA = (config: {tfa_code: string}) => (dispatch: any) => {
  api.post(ACCOUNT_TFA_DISABLE, config).then(({data}) => {
    dispatch(setUser({tfa_enabled: false}));
    navigationRef.current?.goBack();
  });
};

export const onSignInSocial =
  (
    config: {
      social: 'apple' | 'gmail';
      token: string;
      tfa_code?: string;
    },
    onActionTFA?: () => void,
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading());
    const formData = getFormData(config);
    try {
      const {data} = await api.post(USER_SOCIAL_LOGIN, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      dispatch(setUser(data));
      dispatch(setValue({field: 'isAuth', data: true}));
      const isFirstLaunch = AppsFlyerOnInstall();

      if (isFirstLaunch) {
        AppsFlyerLogEvent(registration, config);
      }
    } catch (error) {
      const {code} = error.response.data;
      if (code === 'tfa' && onActionTFA) {
        onActionTFA();
      }
      console.log('Social login error', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onRefreshToken =
  () => async (dispatch: any, getState: () => IStore) => {
    try {
      const refreshToken = getState().auth.user?.refresh_token;

      const formData = new FormData();
      formData.append('refresh_token', refreshToken);

      const {data} = await api.post<IUser>(USER_REFRESH_TOKEN, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      await dispatch(setUser(data));

      return Promise.resolve(data);
    } catch (e) {
      dispatch(onLogout());
    }
  };

/**
 * Set downtime screen if response status 503
 * @param {boolean} bool
 */
export const setDowntime = (bool: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_DOWNTIME_SCREEN,
    payload: bool,
  });
};

/**
 * Check social register
 * @param {object} params
 */
export const checkSocialRegister = (params: any) => async (dispatch: any) => {
  try {
    const config = {
      params,
    };
    const {data} = await api.get('/user/check-social-register', config);

    dispatch({
      type: CHECK_SOCIAL_REGISTER,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserBalanceApi = (code: string) => async (dispatch: any) => {
  try {
    const {data} = await api.get(`${USER_BALANCE}/${code}`);

    dispatch(setUserBalance(data));
  } catch (e) {
    console.log(e.response.message);
  }
};
