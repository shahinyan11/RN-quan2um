import i18n from 'i18next';
import * as Types from './types';
import {IAccount, INotifications, IQuestions, SET_VALUE} from '../types';
import api from '@api';
import Api, {
  ACCOUNT_BANK_SCORE_CREATE,
  ACCOUNT_BANK_SCORE_DELETE,
  ACCOUNT_BANK_SCORE_VERIFICATION,
  ACCOUNT_CHECK_FCM_TOKEN,
  ACCOUNT_DEACTIVATE_EMAIL,
  ACCOUNT_DEPOSIT_CREATE,
  ACCOUNT_DEPOSIT_LIST,
  ACCOUNT_DEPOSIT_WALLETS,
  ACCOUNT_NOTIFICATIONS,
  ACCOUNT_NOTIFICATIONS_DELETE,
  ACCOUNT_NOTIFICATIONS_READ,
  ACCOUNT_SUBSCRIBE_FCM,
  ACCOUNT_SUPPORT_CREATE_QUESTION,
  ACCOUNT_SUPPORT_LIST,
  ACCOUNT_TRANSFER,
  ACCOUNT_TRANSFER_CREATE,
  ACCOUNT_TRANSFERS_P2p,
  ACCOUNT_UNSUBSCRIBE_FCM,
  ACCOUNT_UPDATE_EMAIL,
  ACCOUNT_UPDATE_EMAIL_VERIFICATION,
  ACCOUNT_UPDATE_PHONE,
  ACCOUNT_VERIFICATION_DOCUMENT_CREATE,
  ACCOUNT_VERIFICATION_DOCUMENT_DELETE,
  ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_PHOTO,
  ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_VIDEO,
  ACCOUNT_VERIFICATION_SEND,
  ACCOUNT_WALLET_TRANSACTIONS,
  ACCOUNT_WALLETS_FOR_WITHDRAWALS,
  ACCOUNT_WITHDRAW_CONFIRM,
  ACCOUNT_WITHDRAW_CREATE,
  ACCOUNT_WITHDRAW_LIST,
  ACCOUNT_WITHDRAW_RESEND_CODE,
  ACCOUNT_WITHDRAW_WALLETS,
  USER_CHANGE_PASSWORD,
} from '@api';
import {navigationRef} from '@navigation/index';
import {onSuccessMessage} from '@store/app';
import {getUserInfo} from '@store/auth';
import {VerificationCreateResponse} from '@store/account/types';
import {
  CLEAR_TRANSACTIONS,
  CLEAR_TRANSFER_FORM,
  CLEAR_WALLET,
  CLEAR_WALLET_ADDRESS,
  CLEAR_WITHDRAWAL_FORM,
  GET_ACCOUNT_ASSETS,
  GET_ACCOUNT_DASHBOARD,
  GET_FEES,
  SET_ACCOUNT_TRANSFER,
  SET_FCM_SUBSCRIBE,
  SET_TRANSFER_FORM,
  SET_WITHDRAW_FORM,
} from '@store/reducerTypes';

import {IPayload, IStore} from '@store/types';
import {getFormData} from '@utils/index';
import {IBankAccount} from '@screens/Withdrawal/BankAccountAdd/reducer';

const setValue = (payload: IPayload<IAccount>) => ({
  type: SET_VALUE,
  payload,
});

const setLoading = (data: boolean = true) => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data,
  },
});

type IPagination = {
  page?: number;
  currency_id?: number;
  loadMore?: boolean;
};

export const getRefillWallet =
  ({id, onSuccess}: {id: number; onSuccess?: () => void}) =>
  async (dispatch: any) => {
    try {
      const {data} = await api.get(`${ACCOUNT_DEPOSIT_WALLETS}/${id}`);

      dispatch(setValue({field: 'wallet', data}));
    } finally {
      /**
       * onSuccess function using only for set loader
       * if request was fail set loader to false
       */
      if (onSuccess) {
        onSuccess();
      }
    }
  };

export const onChangePassword =
  (config: {current_password: string; new_password: string}) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      dispatch(setLoading(true));
      const {email} = getState().auth.user;
      const {data} = await api.post(USER_CHANGE_PASSWORD, {...config, email});

      if (data.code === 'ok') {
        dispatch(
          onSuccessMessage(i18n.t('recovery_pass.recovery_password_success')),
        );
      }
      navigationRef.current?.goBack();
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getWithdrawal =
  (config: {id: number}, onSuccess?: () => void) => (dispatch: any) => {
    dispatch(setLoading(true));
    api
      .get(`${ACCOUNT_WITHDRAW_WALLETS}/${config.id}`)
      .then(({data}) => {
        dispatch(setValue({field: 'wallet', data}));
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };

type IWithdrawPagination = {
  currencyId: number;
} & IPagination;

export const onWithdrawWalletDelete =
  ({ids}: {ids: number[]}) =>
  (dispatch: any, getStore: () => IStore) => {
    dispatch(setLoading(true));

    const {withdrawalWallets} = getStore().account;

    api
      .delete(`${ACCOUNT_WALLETS_FOR_WITHDRAWALS}/delete`, {
        params: {
          ids: ids.toString(),
        },
      })
      .then(() => {
        const wallets = withdrawalWallets.data.filter(
          item => item.id !== ids[0],
        );

        dispatch(
          setValue({
            field: 'withdrawalWallets',
            data: {
              ...withdrawalWallets,
              data: wallets,
            },
          }),
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onWithdrawWalletCreate =
  ({
    currencyId,
    data,
    onSuccess,
  }: {
    currencyId: number;
    data: {
      name: string;
      address: string;
    };
    onSuccess: () => void;
  }) =>
  (dispatch: any, getStore: () => IStore) => {
    const {withdrawalWallets} = getStore().account;
    dispatch(setLoading(true));
    api
      .post(`${ACCOUNT_WALLETS_FOR_WITHDRAWALS}/${currencyId}/create`, {
        wallet: [data],
      })
      .then(({data: wallet}) => {
        const wallets = withdrawalWallets.data;
        dispatch(
          setValue({
            field: 'withdrawalWallets',
            data: {
              ...withdrawalWallets,
              data: wallets.concat(wallet),
            },
          }),
        );
      })
      .then(() => {
        onSuccess();
      })
      .finally(() => dispatch(setLoading(false)));
  };

/**
 * Update wallet address
 * @param {object} wallet - new wallet data to update
 * @param {function} onSuccess - callback action to do some
 */
export const onWithdrawWalletUpdate =
  (wallet: {id: number; name: string; address: string}, onSuccess: any) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await api.post(`${ACCOUNT_WALLETS_FOR_WITHDRAWALS}/update`, {
        wallet: [wallet],
      });

      onSuccess();
    } finally {
      dispatch(setLoading(false));
    }
  };

type WithdrawCreateData = {
  currency_id: number;
  amount: number;
  payment_system_id: number;
  requisites: string;
  is_mobile: 0 | 1;
  tfa_code?: string;
};

export const onWithdrawCreate =
  (
    params: WithdrawCreateData,
    onSuccess: () => void,
    onActionTFA?: () => void,
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const formData = getFormData(params);

      const config = {
        headers: {'Content-Type': 'multipart/form-data'},
      };

      await api.post(ACCOUNT_WITHDRAW_CREATE, formData, config);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const {code} = err.response.data;
      if (code === 'tfa' && onActionTFA) {
        onActionTFA();
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onResendWithdrawalCode = () => async () => {
  try {
    await api.get(ACCOUNT_WITHDRAW_RESEND_CODE);
  } catch (err) {
    console.log(err.message);
  }
};

export const onWithdrawalConfirm =
  (data: {tfa_code: string; token: string}, onSuccess?: () => void) =>
  async (dispatch: any) => {
    try {
      await api.post(`${ACCOUNT_WITHDRAW_CONFIRM}`, data);

      dispatch(clearWithdrawalForm());
      dispatch(clearWallet());

      // onSuccess();

      dispatch(
        onSuccessMessage(i18n.t('account.withdrawal-successfully-created')),
      );
    } catch (err) {
      console.log(err.message);
    }
  };

export const getWithdrawalWallets =
  (
    config = {
      currencyId: 2,
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {withdrawalWallets} = getStore().account;
      const {links} = withdrawalWallets;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = `${ACCOUNT_WALLETS_FOR_WITHDRAWALS}/${config.currencyId}`;

      if (loadMore && links?.next) {
        url = links.next;
      }

      const response = await api.get(url);
      const {data: walletsList} = response.data;

      const customData = loadMore
        ? withdrawalWallets.data.concat(walletsList)
        : walletsList;

      dispatch(
        setValue({
          field: 'withdrawalWallets',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onClearHistoryOut = () => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'historyOut',
      data: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
        },
      },
    }),
  );
};

export const onClearHistory = () => (dispatch: any) => {
  dispatch(
    setValue({
      field: 'history',
      data: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
        },
      },
    }),
  );
};

export const getHistoryPutIn =
  (
    config = {
      currency_id: undefined,
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {history} = getStore().account;
      const {links} = history;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = ACCOUNT_DEPOSIT_LIST;

      if (loadMore && links?.next) {
        url = links?.next;
      }

      const response = await api.get(url, {
        params: config,
      });

      const {data: historyList} = response.data;

      const customData = loadMore
        ? history.data.concat(historyList)
        : historyList;

      dispatch(
        setValue({
          field: 'history',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getHistoryPutOut =
  (
    config = {
      currency_id: undefined,
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {history} = getStore().account;
      const {links} = history;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = ACCOUNT_WITHDRAW_LIST;

      if (loadMore && links?.next) {
        url = links.next;
      }

      const response = await api.get(url, {params: config});
      const {data: historyList} = response.data;
      const customData = loadMore
        ? history.data.concat(historyList)
        : historyList;

      dispatch(
        setValue({
          field: 'historyOut',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getNotifications =
  (
    config = {
      currency_id: undefined,
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {notifications} = getStore().account;
      const {links} = notifications;

      if (loadMore && !links?.next) {
        return;
      }

      let url = ACCOUNT_NOTIFICATIONS;

      if (loadMore && links?.next) {
        url = links.next;
      }

      dispatch(setLoading(true));

      const response = await api.get<INotifications>(url, {
        params: config,
      });

      const {data: notificationsList} = response.data;
      const customData = loadMore
        ? notifications.data.concat(notificationsList)
        : notificationsList;

      dispatch(
        setValue({
          field: 'notifications',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onNotificationsRead =
  (
    config: {
      ids: number[];
      read_all: number;
    } = {ids: [], read_all: 0},
  ) =>
  (dispatch: any, getStore: () => IStore) => {
    const notifications = getStore().account.notifications;
    const {ids, read_all} = config;

    api.post(ACCOUNT_NOTIFICATIONS_READ, config).then(() => {
      const data = {
        ...notifications,
        data: notifications.data.map(item => {
          if (read_all) {
            return {
              ...item,
              is_read: true,
            };
          }

          const isExist = Boolean(ids.find(id => id === item.id));
          if (isExist) {
            return {...item, is_read: true};
          }

          return item;
        }),
      };

      dispatch(
        setValue({
          field: 'notifications',
          data,
        }),
      );
    });
  };

export const onNotificationsDelete =
  (
    config: {
      ids: number[];
      delete_all: number;
    } = {ids: [], delete_all: 0},
  ) =>
  (dispatch: any, getStore: () => IStore) => {
    const notifications = getStore().account.notifications;
    const {ids, delete_all} = config;

    api.delete(ACCOUNT_NOTIFICATIONS_DELETE, {data: config}).then(() => {
      if (delete_all) {
        dispatch(
          setValue({
            field: 'notifications',
            data: {
              data: [],
              meta: {
                current_page: 1,
                last_page: 1,
              },
            },
          }),
        );
        return;
      }

      const filteredData = notifications.data.filter(notification => {
        const isExist = Boolean(ids.find(id => id === notification.id));

        return !isExist;
      });

      dispatch(
        setValue({
          field: 'notifications',
          data: {
            ...notifications,
            data: filteredData,
          },
        }),
      );
    });
  };

export const onTransferCreate =
  (
    config: {
      account_id: string;
      currency_id: number;
      amount: string;
      comment: string;
      tfa_code?: string;
    },
    onSuccess: () => void,
  ) =>
  async (dispatch: any) => {
    const formData = getFormData(config);

    dispatch(setLoading(true));
    try {
      const response = await api.post(ACCOUNT_TRANSFER_CREATE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      onSuccess();

      dispatch({
        type: CLEAR_TRANSFER_FORM,
      });
      dispatch({
        type: SET_ACCOUNT_TRANSFER,
        payload: response.data,
      });
      // AppsFlyerLogEvent();
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onUpdateEmail =
  ({
    data,
  }: {
    data: {
      email: string;
      country_id?: string;
    };
  }) =>
  async () => {
    try {
      const formData = getFormData(data);
      await api.post(ACCOUNT_UPDATE_EMAIL, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    } catch (err) {
      console.log(err.message);
    }
  };

export const onUpdateEmailVerification = (code: string) => (dispatch: any) => {
  dispatch(setLoading(true));

  const formData = new FormData();
  formData.append('code', code);

  api
    .post(ACCOUNT_UPDATE_EMAIL_VERIFICATION, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(() => {
      dispatch(getUserInfo());
    })
    .finally(() => dispatch(setLoading(false)));
};

export const onUpdatePhone =
  ({
    data,
    onSuccess,
  }: {
    data: {
      phone: string;
      phone_code?: string;
      country_id?: number;
    };
    onSuccess?: () => void;
  }) =>
  (dispatch: any) => {
    const formData = getFormData(data);
    dispatch(setLoading(true));
    api
      .post(ACCOUNT_UPDATE_PHONE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(() => {
        dispatch(getUserInfo());
      })

      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const getTransactions =
  (config: any, loadMore = false) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {transactions} = getStore().account;
      const {links} = transactions;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = `${ACCOUNT_WALLET_TRANSACTIONS}/${config.currencyId}`;

      if (loadMore && links?.next) {
        url = links?.next;
      }

      const response = await api.get(url, {params: config});
      const {data: transactionsList} = response.data;
      const customData = loadMore
        ? transactions.data.concat(transactionsList)
        : transactionsList;
      dispatch(
        setValue({
          field: 'transactions',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

/**
 * Clear transactions from store
 */
export const clearTransactions = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_TRANSACTIONS,
  });
};

export const getTransactionsP2p =
  (
    config = {
      currencyId: 2,
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {transactionsP2P} = getStore().account;
      const {links} = transactionsP2P;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = `${ACCOUNT_TRANSFERS_P2p}/${config.currencyId}`;

      if (loadMore && links?.next) {
        url = links?.next;
      }

      const response = await api.get(url, {params: config});

      const {data: transactionsList} = response.data;
      const customData = loadMore
        ? transactionsP2P.data.concat(transactionsList)
        : transactionsList;
      dispatch(
        setValue({
          field: 'transactionsP2P',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getSupportList =
  (loadMore = false) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {questions} = getStore().account;
      const {links} = questions;

      if (loadMore && !links?.next) {
        return;
      }

      let url = ACCOUNT_SUPPORT_LIST;

      if (loadMore && links?.next) {
        url = links?.next;
      }

      dispatch(setLoading(true));

      const {data} = await api.get<IQuestions>(url);

      const {tickets: transactionsList} = data;

      const customData = loadMore
        ? questions.tickets.concat(transactionsList)
        : transactionsList;

      dispatch(
        setValue({
          field: 'questions',
          data: {...data, tickets: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onCreateQuestion =
  (config: {category_id: number; comment: string; userfile: any}) =>
  async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const formData = getFormData(config);
      await api.post(ACCOUNT_SUPPORT_CREATE_QUESTION, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      dispatch(onSuccessMessage('Question success sent'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onVerificationCreate =
  (
    config: {document_type_id: number; country_id: number},
    onSuccess?: () => void,
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      const {data} = await api.post<VerificationCreateResponse>(
        ACCOUNT_VERIFICATION_DOCUMENT_CREATE,
        config,
      );

      dispatch(setValue({field: 'verification', data}));

      if (onSuccess) {
        onSuccess();
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onVerificationUploadDocument =
  (config: {application_id: number; userfile: any; is_selfie?: boolean}) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('application_id', config.application_id);
      formData.append('userfile', config.userfile);
      formData.append('isSelfie', config.is_selfie);

      const {data} = await api.post(
        ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_PHOTO,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      const {verification} = getState().account;
      verification.status.documents.push({
        ...config.userfile,
        is_selfie: config.is_selfie,
        id: data.upload_id,
      });

      dispatch(setValue({field: 'verification', data: {...verification}}));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onVerificationSend =
  ({application_id}: {application_id: number}, onSuccess?: () => void) =>
  async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append('application_id', application_id);

      console.log(111111);
      await api.post(ACCOUNT_VERIFICATION_SEND, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log('[VERIFICATION]:', e);
    }
  };

export const onVerificationUploadVideo =
  (config: {application_id: number; userfile: any}) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      const formData = new FormData();
      formData.append('application_id', config.application_id);
      formData.append('userfile', config.userfile);

      await api.post(ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_VIDEO, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(
        onVerificationSend({application_id: config.application_id}, () => {
          navigationRef.current?.reset({
            index: 0,
            routes: [
              {
                name: 'Main',
                state: {
                  index: 0,
                  routes: [{name: 'Profile'}],
                },
              },
            ],
          });
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onVerificationDeleteDocument =
  (config: {application_id: number; upload_id: number}) =>
  async (dispatch: any, getState: () => IStore) => {
    const {application_id, upload_id} = config;
    try {
      dispatch(setLoading(true));
      await api.delete(
        `${ACCOUNT_VERIFICATION_DOCUMENT_DELETE}/${application_id}/${upload_id}`,
      );

      const {verification} = getState().account;
      const {documents} = verification.status;

      const tempDocuments = documents.filter(
        document => document.id !== upload_id,
      );

      const data: VerificationCreateResponse = {
        ...verification,
        status: {
          ...verification.status,
          documents: tempDocuments,
        },
      };

      dispatch(setValue({field: 'verification', data}));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onVerificationBankScore =
  (
    state: IBankAccount,
    onSuccess: (response: {label: string; value: string}[]) => void,
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading());
      const tempState: IBankAccount = {
        ...state,
        country: state.country.id,
      };

      const formData = getFormData(tempState);

      const {data} = await api.post(ACCOUNT_BANK_SCORE_VERIFICATION, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      onSuccess(data);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onDeleteBankScore = (ids: number[]) => async (dispatch: any) => {
  try {
    await api.delete(ACCOUNT_BANK_SCORE_DELETE, {
      params: {
        ids: ids.toString(),
      },
    });
  } finally {
  }
};

export const onCreateBankScore =
  (state: IBankAccount, onSuccess: () => void) => async (dispatch: any) => {
    try {
      dispatch(setLoading());
      const tempState: IBankAccount = {
        ...state,
        country: state.country.id,
      };
      const formData = getFormData(tempState);

      await api.post(ACCOUNT_BANK_SCORE_CREATE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      onSuccess();
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onRefillDepositCreate =
  (
    config: {
      currency_id: number;
      amount: number;
      payment_system_id: number;
      operation_id?: string;
      payment_intent_id?: string;
      transaction_id?: string;
    },
    onSuccess: (e?: any) => void,
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const formData = getFormData(config);
      const {data} = await api.post(ACCOUNT_DEPOSIT_CREATE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      onSuccess(data);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onAccountDeactivate =
  ({onSuccess, config = {}}: Types.OnAccountDeactivate) =>
  async () => {
    try {
      const formData = getFormData(config);
      await api.post(ACCOUNT_DEACTIVATE_EMAIL, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (onSuccess) {
        onSuccess();
      }
    } finally {
    }
  };

export const onFCMSubscribe = (token: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    await api.post(ACCOUNT_SUBSCRIBE_FCM, {push_id: token});
  } catch (e) {
    console.log('[ERROR]: Error send FCM token to server');
  }
};

export const onFCMUnsubscribe =
  (token: string, onSuccess: () => void) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      await api.post(ACCOUNT_UNSUBSCRIBE_FCM, {push_id: token});

      onSuccess();
    } catch (e) {
      console.log('[ERROR]: Error send FCM token to server');
    }
  };

export const checkFCMSubscribe = (token: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const {data} = await api.get(`${ACCOUNT_CHECK_FCM_TOKEN}/${token}`);

    dispatch({
      type: SET_FCM_SUBSCRIBE,
      payload: data.exists,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getAccountTransfer = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await Api.get(ACCOUNT_TRANSFER);

    dispatch({
      type: SET_ACCOUNT_TRANSFER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Set transfer form
 * @param {object} data
 */
export const setTransferForm = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_TRANSFER_FORM,
    payload: data,
  });
};

/**
 * Get fees and pair fees
 */
export const getFees = () => async (dispatch: any) => {
  try {
    const {
      data: {fees, pair_fees},
    } = await api.get('/account/dashboard');

    dispatch({
      type: GET_FEES,
      payload: {fees, pair_fees},
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Switch to business account
 * @param {object} form
 */
export const switchBusinessAccount = (form: any) => async (dispatch: any) => {
  try {
    const formData = getFormData(form);

    await api.post('/account/business-request', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    dispatch(onSuccessMessage(i18n.t('account.change_success')));
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Get account assets(currencies)
 */
export const getAccountAssets = () => async (dispatch: any) => {
  try {
    const {data} = await api.get('/account/assets');

    dispatch({
      type: GET_ACCOUNT_ASSETS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get account dashboard info
 */
export const getAccountDashboard = () => async (dispatch: any) => {
  try {
    const {data} = await api.get('/account/dashboard-mobile');

    dispatch({
      type: GET_ACCOUNT_DASHBOARD,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Set form for withdraw
 * @param data
 */
export const setWithdrawForm = (data: any) => (dispatch: any) =>
  dispatch({
    type: SET_WITHDRAW_FORM,
    payload: data,
  });

/**
 * Clear wallet addresses list
 */
export const clearWalletAddress = () => (dispatch: any) =>
  dispatch({
    type: CLEAR_WALLET_ADDRESS,
  });

/**
 * Clear withdrawal form
 */
export const clearWithdrawalForm = () => (dispatch: any) =>
  dispatch({
    type: CLEAR_WITHDRAWAL_FORM,
  });

/**
 * Clear wallet
 */
export const clearWallet = () => (dispatch: any) =>
  dispatch({
    type: CLEAR_WALLET,
  });

export const setWallet = () => (dispatch: any) =>
  dispatch({
    type: CLEAR_WALLET,
  });
