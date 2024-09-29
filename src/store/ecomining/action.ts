import api, {
  ACCOUNT_MASTER_NODE,
  ACCOUNT_MASTER_NODE_HISTORY,
  ACCOUNT_MASTER_NODE_HISTORY_FILTERS,
  ACCOUNT_MASTER_NODE_INVEST,
  ACCOUNT_MASTER_NODE_WITHDRAWAL,
} from '@api';
import {
  IMasterNodes,
  IMasterNodesHistoryFiltered,
  INodes,
  SET_ASSETS,
  SET_VALUE,
} from './types';
import {onSuccessMessage} from '@store/app';

import {IAction, IPayload, IStore} from '@store/types';
import {AppsFlyerLogEvent, ecomining} from '@utils/appsflyer';
import {hideModal} from '@store/modal';

const setValue = (payload: IPayload<IMasterNodes>) => ({
  type: SET_VALUE,
  payload,
});

const setLoading = (
  status: boolean = true,
): IAction<IPayload<IMasterNodes>> => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data: status,
  },
});

export const setAssets = (payload: any) => ({
  type: SET_ASSETS,
  payload,
});

export const getMasterNodes =
  () => async (dispatch: any, getStore: () => IStore) => {
    try {
      //const data = getStore().ecomining.node;
      dispatch(setLoading());
      const REQUEST_URL = ACCOUNT_MASTER_NODE;

      api.get<INodes>(REQUEST_URL).then(({data: responseData}) => {
        const tempMasteNode: INodes = {
          ...responseData,
        };
        dispatch(
          setValue({
            field: 'node',
            data: tempMasteNode,
          }),
        );
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getHistory =
  (
    config: {
      page?: number;
      master_node_id?: number;
      kind?: number;
      time_start?: number;
      time_end?: number;
    },
    loadMore = false,
  ) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {master_nodes_history} = getStore().ecomining;
      const {links} = master_nodes_history;

      if (loadMore && !links?.next) {
        return;
      }

      dispatch(setLoading(true));

      let url = ACCOUNT_MASTER_NODE_HISTORY;

      if (loadMore && links?.next) {
        url = links?.next;
      }

      const response = await api.get(url, {
        params: config,
      });

      const {data: historyList} = response.data;

      const customData = loadMore
        ? master_nodes_history.data.concat(historyList)
        : historyList;

      dispatch(
        setValue({
          field: 'master_nodes_history',
          data: {...response.data, data: customData},
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getHistoryFilter =
  () => async (dispatch: any, getStore: () => IStore) => {
    try {
      //const data = getStore().ecomining.node;
      dispatch(setLoading());
      const REQUEST_URL = ACCOUNT_MASTER_NODE_HISTORY_FILTERS;

      api
        .get<IMasterNodesHistoryFiltered>(REQUEST_URL)
        .then(({data: responseData}) => {
          const tempMasteNode: IMasterNodesHistoryFiltered = {
            ...responseData,
          };

          dispatch(
            setValue({
              field: 'master_nodes_history_filtered',
              data: tempMasteNode,
            }),
          );
        });
    } finally {
      dispatch(setLoading(false));
    }
  };

type MakeInvestment = {
  amount: number;
  isBonus?: boolean;
  multipleReward?: boolean;
};

export const makeInvestment =
  ({amount, isBonus, multipleReward = false}: MakeInvestment) =>
  async (dispatch: any) => {
    try {
      await api.post(ACCOUNT_MASTER_NODE_INVEST, {
        amount_total: amount,
        [`amount_${isBonus ? 'bonus' : 'main'}`]: amount,
        is_multiple_reward: multipleReward,
      });

      dispatch(hideModal());
      dispatch(onSuccessMessage('successfully invested'));
      dispatch(getMasterNodes());
    } catch (e) {
      dispatch(hideModal());
    }
  };

export const onWithdrawal =
  (investment_id: number) => async (dispatch: any, getState: () => IStore) => {
    try {
      await api.post(ACCOUNT_MASTER_NODE_WITHDRAWAL, {investment_id});

      dispatch(onSuccessMessage('successfully Withdrawal'));
      dispatch(getMasterNodes());
      AppsFlyerLogEvent(ecomining, {investment_id});
    } catch (e) {
      dispatch(hideModal());
    }
  };
