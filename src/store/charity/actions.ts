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
} from '@store/reducerTypes';

export const setFundTypes = payload => ({
  type: SET_FUND_TYPES,
  payload,
});

export const setFundList = payload => ({
  type: SET_FUND_LIST,
  payload,
});

export const setCurrentFund = payload => ({
  type: SET_CURRENT_FUND,
  payload,
});

export const setActiveCollections = payload => ({
  type: SET_ACTIVE_COLLECTIONS,
  payload,
});

export const setCollectionList = payload => ({
  type: SET_COLLECTION_LIST,
  payload,
});

export const setUserProposal = payload => ({
  type: SET_USER_PROPOSAL,
  payload,
});

export const setTestQuestion = payload => ({
  type: SET_TEST_QUESTION,
  payload,
});

export const setTestState = payload => ({
  type: SET_TEST_STATE,
  payload,
});

export const setTransactionInfo = payload => ({
  type: SET_TRANSACTION_INFO,
  payload,
});

export const setUserFunds = payload => ({
  type: SET_USER_FUNDS,
  payload,
});

export const setPersonals = payload => ({
  type: SET_PERSONALS,
  payload,
});

export const setZakats = payload => ({
  type: SET_ZAKATS,
  payload,
});

export const setSadkas = payload => ({
  type: SET_SADAKAS,
  payload,
});

export const setUserPersonals = payload => ({
  type: SET_USER_PERSONALS,
  payload,
});

export const setUserZakats = payload => ({
  type: SET_USER_ZAKATS,
  payload,
});

export const setUserSadakas = payload => ({
  type: SET_USER_SADAKAS,
  payload,
});

export const setSelectedFundType = payload => ({
  type: SET_SELECTED_FUND_TYPE,
  payload,
});
