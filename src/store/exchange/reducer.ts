import {
  SET_CURRENT_EXCHANGE,
  SET_EXCHANGE_TRANSACTIONS,
  SET_LIST,
  SET_SELECTED_METHOD,
} from '../reducerTypes';
import {Action, CurrentExchange, InitState} from './types';

const init: InitState = {
  list: [],
  transactions: [],
  currentExchange: {} as CurrentExchange,
  selectedMethod: {},
};

const exchangeReducer = (state = init, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_EXCHANGE:
      return {
        ...state,
        currentExchange: action.payload,
      };

    case SET_EXCHANGE_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload],
      };

    case SET_LIST:
      return {
        ...state,
        list: [...action.payload],
        selectedMethod: action.payload[0],
      };

    case SET_SELECTED_METHOD:
      return {
        ...state,
        selectedMethod: {...action.payload},
      };

    default:
      return state;
  }
};

export default exchangeReducer;
