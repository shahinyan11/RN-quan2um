import {
  SET_ACTIVE_COLLECTIONS,
  SET_COLLECTION_LIST,
  SET_CURRENT_FUND,
  SET_FUND_LIST,
  SET_FUND_TYPES,
  SET_PERSONALS,
  SET_SADAKAS,
  SET_SELECTED_FUND_TYPE,
  SET_TEST_QUESTION,
  SET_TEST_STATE,
  SET_TRANSACTION_INFO,
  SET_USER_FUNDS,
  SET_USER_PERSONALS,
  SET_USER_PROPOSAL,
  SET_USER_SADAKAS,
  SET_USER_ZAKATS,
  SET_ZAKATS,
} from '../reducerTypes';
import {Action, CurrentExchange, InitState} from './types';

const init: InitState = {
  fundTypes: [],
  fundList: [],
  collectionList: [],
  activeCollections: [],
  currentFund: {},
  transactions: [],
  currentExchange: {} as CurrentExchange,
  selectedMethod: {},
  testQuestion: {},
  transactionInfo: {},
  testState: {
    current_question: 0,
    tries: 0,
    status: 0,
    current_question_start_time: '',
    max_tries_count: 0,
    allowed_answer_time: 0,
  },
  userFunds: [],
  personals: [],
  zakats: [],
  sadakas: [],
  userPersonals: [],
  userZakats: [],
  userSadakas: [],
  selectedFundType: undefined,
  userProposal: undefined,
};

const exchangeReducer = (state = init, action: Action) => {
  switch (action.type) {
    // case SET_CURRENT_EXCHANGE:
    //   return {
    //     ...state,
    //     currentExchange: action.payload,
    //   };

    case SET_FUND_TYPES:
      return {
        ...state,
        fundTypes: action.payload,
      };

    case SET_FUND_LIST:
      return {
        ...state,
        fundList: action.payload,
      };

    case SET_ACTIVE_COLLECTIONS:
      return {
        ...state,
        activeCollections: action.payload,
      };

    case SET_COLLECTION_LIST:
      return {
        ...state,
        collectionList: action.payload,
      };

    case SET_CURRENT_FUND:
      return {
        ...state,
        currentFund: action.payload,
      };

    case SET_USER_PROPOSAL:
      return {
        ...state,
        userProposal: action.payload,
      };

    case SET_TEST_STATE:
      return {
        ...state,
        testState: action.payload,
      };
    case SET_TEST_QUESTION:
      return {
        ...state,
        testQuestion: action.payload,
      };
    case SET_TRANSACTION_INFO:
      return {
        ...state,
        transactionInfo: action.payload,
      };
    case SET_USER_FUNDS:
      return {
        ...state,
        userFunds: action.payload,
      };
    case SET_PERSONALS:
      return {
        ...state,
        personals: action.payload,
      };
    case SET_ZAKATS:
      return {
        ...state,
        zakats: action.payload,
      };
    case SET_SADAKAS:
      return {
        ...state,
        sadakas: action.payload,
      };
    case SET_USER_PERSONALS:
      return {
        ...state,
        userPersonals: action.payload,
      };
    case SET_USER_ZAKATS:
      return {
        ...state,
        userZakats: action.payload,
      };
    case SET_USER_SADAKAS:
      return {
        ...state,
        userSadakas: action.payload,
      };
    case SET_SELECTED_FUND_TYPE:
      return {
        ...state,
        selectedFundType: action.payload,
      };

    default:
      return state;
  }
};

export default exchangeReducer;
