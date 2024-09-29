import api, {
  ACCOUNT_MASTER_NODE_HISTORY,
  ACCOUNT_MASTER_NODE_INVEST,
  ACCOUNT_MASTER_NODE_WITHDRAWAL,
  ACCOUNT_MASTER_NODES_WITH_REWARD,
} from '@api';
import {
  resetInvestment,
  setMasterNodesHistory,
  setMasterNodesWithReward,
} from '@store/masterNodesX10/actions';
import {hideModal, showModal} from '@store/modal';
import {IStore} from '@store/types';
import moment from 'moment';

export const getMasterNodesWithReward = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(ACCOUNT_MASTER_NODES_WITH_REWARD);
    dispatch(setMasterNodesWithReward(data));
  } catch (e) {
    console.log('getMasterNodes', e);
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

      dispatch(showModal({modalType: 'INVEST_SUCCESS'}));
      dispatch(getMasterNodesWithReward());
    } catch (e) {
      dispatch(hideModal());
    }
  };

export const getMasterNodesWithRewardHistory =
  (kind = 1) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      const state = getState();
      const {node} = state.masterNodesX10;
      const {time_start, time_end} = state.filters;
      const {data} = await api.get(ACCOUNT_MASTER_NODE_HISTORY, {
        params: {
          kind,
          master_node_id: node.id,
          time_start: moment(time_start)?.valueOf() / 1000 || null,
          time_end: moment(time_end)?.valueOf() / 1000 || null,
        },
      });

      dispatch(setMasterNodesHistory(data.data));
    } catch (e) {
      console.log('getMasterNodesWithRewardHistory', e.response);
    }
  };

export const makeWithdrawal =
  () => async (dispatch: any, getState: () => IStore) => {
    try {
      await api.post(ACCOUNT_MASTER_NODE_WITHDRAWAL, {
        investment_id: getState().masterNodesX10.node_investment?.id,
      });

      dispatch(resetInvestment());
      dispatch(showModal({modalType: 'WITHDRAW_SUCCESS'}));
    } catch (e) {
      dispatch(hideModal());
    }
  };
