// import {combineReducers} from 'redux';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from './app';
import authReducer from './auth';
import pagesReducer from './pages';
import modalReducer from './modal';
import marketReducer from './market';
import accountReducer from './account';
import ecominingReducer from './ecomining';
import tradeViewReducer from './tradeview';
import filtersReducer from './filters';
import masterNodesX10Reducer from './masterNodesX10';
import referralsReducer from './referral';
import exchangeReducer from './exchange';
import bonusAccountReducer from './bonusAccount';
import charityReducer from './charity';
import tradeViewChatReducer from './tradeViewChat';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['account', 'pages', 'tradeview', 'tradeViewChat'],
  whitelist: ['app', 'auth'],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  account: accountReducer,
  pages: pagesReducer,
  tradeview: tradeViewReducer,
  ecomining: ecominingReducer,
  market: marketReducer,
  modal: modalReducer,
  filters: filtersReducer,
  masterNodesX10: masterNodesX10Reducer,
  referrals: referralsReducer,
  exchange: exchangeReducer,
  bonusAccount: bonusAccountReducer,
  charity: charityReducer,
  tradeViewChat: tradeViewChatReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
