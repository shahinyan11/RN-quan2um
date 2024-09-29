import {AnyAction} from 'redux';

import {IApp} from './app/types';
import {IAuth} from './auth/types';
import {IAccount} from './account/types';

import {IPages} from './pages/types';
import {ITradeView} from './tradeview';
import {IMasterNodes} from './ecomining/types';

export interface IStore {
  auth: IAuth;
  app: IApp;
  account: IAccount;
  pages: IPages;
  tradeview: ITradeView;
  ecomining: IMasterNodes;
  masterNodesX10: any;
  exchange: any;
  filters: any;
  market: any;
  bonusAccount: any;
  charity: any;
}

export interface IAction<T> extends AnyAction {
  type: string;
  payload: T;
}

export interface IPayload<T> {
  field: keyof T;
  data: T[keyof T];
}
