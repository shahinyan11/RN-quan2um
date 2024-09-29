import {
  SET_CURRENT_EXCHANGE,
  SET_EXCHANGE_TRANSACTIONS,
  SET_LIST,
  SET_SELECTED_METHOD,
} from '@store/reducerTypes';

export const setCurrentExchange = payload => ({
  type: SET_CURRENT_EXCHANGE,
  payload,
});

export const setTransactions = payload => ({
  type: SET_EXCHANGE_TRANSACTIONS,
  payload,
});

export const setList = payload => ({
  type: SET_LIST,
  payload,
});

export const setSelectedMethod = payload => ({
  type: SET_SELECTED_METHOD,
  payload,
});
