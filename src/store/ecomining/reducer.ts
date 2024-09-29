import {IAction, IPayload} from '@store/types';
import {IMasterNodes, SET_ASSETS, SET_VALUE} from './types';

const initState: IMasterNodes = {
  loading: true,
  loadingSend: false,
  node: {
    currency: {},
    total_nodes: 0,
    current_node: {},
    balance_face: '',
    node_investments: [],
    roi: 0,
    last_transactions: [],
    bonus_wallet: {},
  },
  master_nodes_history: {
    data: [],
    links: {},
    meta: {},
  },
  master_nodes_history_filtered: {
    master_nodes: [],
    kinds: {},
  },
};

const EcominingReducer = (
  state = initState,
  action: IAction<IPayload<any>>,
): IMasterNodes => {
  const {type, payload} = action;
  switch (type) {
    case SET_VALUE: {
      const {field, data} = payload;
      return {
        ...state,
        [field]: data,
      };
    }

    case SET_ASSETS: {
      return {
        ...state,
        node: {
          ...state.node,
          assets: payload,
        },
      };
    }
    default:
      return state;
  }
};

export default EcominingReducer;
