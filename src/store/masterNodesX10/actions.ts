import {
  RESET_INVESTMENT,
  SET_MASTER_NODES_HISTORY,
  SET_MASTER_NODES_WITH_REWARD,
} from '@store/reducerTypes';

export const setMasterNodesWithReward = payload => ({
  type: SET_MASTER_NODES_WITH_REWARD,
  payload,
});

export const setMasterNodesHistory = payload => ({
  type: SET_MASTER_NODES_HISTORY,
  payload,
});

export const resetInvestment = () => ({
  type: RESET_INVESTMENT,
});
