import {
  RESET_INVESTMENT,
  SET_MASTER_NODES_HISTORY,
  SET_MASTER_NODES_WITH_REWARD,
} from '../reducerTypes';
import {Action} from './types';

type Init = {
  history: any[];
  balance_face: string;
  node_investment: any;
  coin: any;
  node: any;
  currency: any;
  roi?: string;
};

const initialState: Init = {
  history: [],
  coin: {},
  node: {},
  currency: {},
  balance_face: '',
  node_investment: {},
  roi: undefined,
};

const masterNodesX10Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_MASTER_NODES_WITH_REWARD:
      return {
        ...state,
        ...action.payload,
        node_investment: action.payload.node_investments[0] || {},
      };

    case SET_MASTER_NODES_HISTORY:
      return {
        ...state,
        history: action.payload,
      };

    case RESET_INVESTMENT:
      return {
        ...state,
        node_investment: {},
      };

    default:
      return state;
  }
};

export default masterNodesX10Reducer;
