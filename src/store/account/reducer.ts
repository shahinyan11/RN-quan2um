import {IAction, IPayload} from '@store/types';
import {IAccount, SET_VALUE} from './types';
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

const defaultTransferForm = {
  account_id: '',
  amount: '',
  comment: '',
  tfa_code: '',
  phoneNumber: {
    code: '',
    phone: '',
    countryId: '',
  },
  userId: '',
  selectedCurrency: null,
};

const defaultWallet = {
  currency: {
    code: '',
  },
  amount_min: '0',
  amount_min_face: '0',
  amount_max: '0',
  amount_max_face: '0',
};

const initState: IAccount = {
  loading: false,
  verification: {
    application_id: 0,
    status: {
      documents: [],
    },
    valid_labels: [],
    is_dev_mode: false,
    recognition_enabled: false,
  },
  history: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  historyOut: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  transactions: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  transactionsP2P: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  notifications: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  withdrawalWallets: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  questions: {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
    },
  },
  wallet: defaultWallet,
  transfer: {
    currencies: [],
  },
  transferForm: defaultTransferForm,
  fees: null,
  assets: null,
  dashboard: null,
  withdrawForm: {
    amount: '',
    requisites: '',
  },
  fcmSubscribe: false,
};

const accountReducer = (
  state = initState,
  action: IAction<IPayload<IAccount>>,
) => {
  const {payload, type} = action;
  switch (type) {
    case SET_VALUE: {
      const {field, data} = action.payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_ACCOUNT_TRANSFER:
      return {
        ...state,
        transfer: payload,
      };
    case SET_TRANSFER_FORM:
      return {
        ...state,
        transferForm: payload,
      };
    case CLEAR_TRANSFER_FORM:
      return {
        ...state,
        transferForm: defaultTransferForm,
      };
    case GET_FEES:
      return {
        ...state,
        fees: payload,
      };
    case GET_ACCOUNT_ASSETS:
      return {
        ...state,
        assets: payload,
      };
    case GET_ACCOUNT_DASHBOARD:
      return {
        ...state,
        dashboard: payload,
      };
    case SET_WITHDRAW_FORM:
      return {
        ...state,
        withdrawForm: {...state.withdrawForm, ...payload},
      };
    case CLEAR_WALLET_ADDRESS:
      return {
        ...state,
        withdrawalWallets: {
          data: [],
          meta: {
            current_page: 1,
            last_page: 1,
          },
        },
      };
    case CLEAR_WITHDRAWAL_FORM:
      return {
        ...state,
        withdrawForm: {
          amount: '',
          requisites: '',
        },
      };
    case CLEAR_WALLET:
      return {
        ...state,
        wallet: defaultWallet,
      };
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          data: [],
        },
        transactionsP2P: {
          ...state.transactionsP2P,
          data: [],
        },
      };
    case SET_FCM_SUBSCRIBE:
      return {
        ...state,
        fcmSubscribe: payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
