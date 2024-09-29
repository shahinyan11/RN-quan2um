import api, {
  ACCOUNT_DEPOSIT_LIST,
  ACCOUNT_EXCHANGE_CREATE,
  ACCOUNT_EXCHANGE_LIST,
  ACCOUNT_EXCHANGE_STATUS,
  ACCOUNT_WITHDRAWAL_LIST,
} from '@api';
import {setCurrentExchange, setList, setTransactions} from './actions';
import {hideModal, showModal} from '@store/modal';
import {EXCHANGE_TABS} from '@constants/tabs';

export const getExchangeList = (from: number) => async (dispatch: any) => {
  try {
    const {data} = await api.get(ACCOUNT_EXCHANGE_LIST, {params: {from}});
    dispatch(setList(data.list));
  } catch (e) {
    console.log('getExchangeList', e.response);
  }
};

export const getTransactionsList =
  ({tab, filters}: any) =>
  async (dispatch: any) => {
    try {
      const url =
        tab === EXCHANGE_TABS.DEPOSIT.id
          ? ACCOUNT_DEPOSIT_LIST
          : ACCOUNT_WITHDRAWAL_LIST;

      const {data} = await api.get(url, {params: filters});

      dispatch(setTransactions(data.data));
    } catch (e) {
      console.log('getTransactionsList', e.response);
    }
  };

type CreateExchange = {
  method: string;
  amount: number;
  from: string;
  // card: string;
};

export const createExchange =
  ({method, amount, from}: CreateExchange) =>
  async (dispatch: any) => {
    try {
      await api.post(ACCOUNT_EXCHANGE_CREATE, {
        method,
        amount,
        from,
        // card,
      });

      // dispatch(setCurrentExchange(data));
      dispatch(getExchangeStatus());
    } catch (e) {
      console.log('createExchange', e.response);
    }
  };

export const getExchangeStatus = () => async (dispatch: any) => {
  try {
    const {data} = await api.post(ACCOUNT_EXCHANGE_STATUS);

    if (+data?.step === 4) {
      dispatch(
        showModal({
          modalType: 'EXCHANGE_COMPLETE',
          modalProps: {amount: data.amount},
        }),
      );

      dispatch(setCurrentExchange(undefined));
      return;
    }

    if (data.status === 'expired') {
      dispatch(hideModal());
    }

    dispatch(setCurrentExchange(data));
  } catch (e) {
    console.log('getExchangeStatus', e.response);
  }
};
