import {IAction, IPayload} from '@store/types';
import {ITradeView, SET_ORDER_BOOK, SET_VALUE, UPDATE_ASSETS} from './types';
import {
  CLEAR_FILTER_ORDER,
  GET_DEALS_HISTORY,
  GET_DEEP_CHART,
  GET_FILTER_PARAMS,
  SET_FILTER_ORDER,
  SET_PAIR_CODE,
  UPDATE_DEAL_PAIR,
  UPDATE_DEEP_CHART,
  UPDATE_HISTORY_ORDER,
} from '../reducerTypes';

const initState: ITradeView = {
  loading: true,
  loadingSend: false,
  orders: {
    data: [],
    links: {},
    meta: {},
  },
  orders_history: {
    data: [],
    links: {},
    meta: {},
  },
  pairs: [],
  currencies: [],
  trade_view: [],
  pair: {
    order_book: {
      asks: [],
      bids: [],
    },
    base_currency: {},
    main_currency: {},
    assets: {},
  },
  chartDataSet: [],
  dealsHistory: null,
  deepChart: {
    asks: [],
    bids: [],
  },
  pairCode: '',
  filterParams: null,
  filterOrder: null,
  dealPair: null,
  whaleDeals: [],
  whaleDealTypes: [],
  whaleDealFilters: [],
};

const tradeViewReducer = (
  state = initState,
  action: IAction<IPayload<any>>,
): ITradeView => {
  const {type, payload} = action;
  switch (type) {
    case SET_VALUE: {
      const {field, data} = payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_ORDER_BOOK: {
      return {
        ...state,
        pair: {
          ...state.pair,
          order_book: {
            asks: payload.asks,
            bids: payload.bids,
          },
        },
      };
    }
    case UPDATE_ASSETS: {
      return {
        ...state,
        pair: {
          ...state.pair,
          assets: payload,
        },
      };
    }
    case GET_DEALS_HISTORY:
      return {
        ...state,
        dealsHistory: payload,
      };
    case GET_DEEP_CHART:
      return {
        ...state,
        deepChart: payload,
      };
    case SET_PAIR_CODE:
      return {
        ...state,
        pairCode: payload.toLowerCase(),
        dealPair: null,
      };
    case UPDATE_DEEP_CHART:
      return {
        ...state,
        deepChart: {
          asks: payload.asks,
          bids: payload.bids,
        },
      };
    case GET_FILTER_PARAMS:
      return {
        ...state,
        filterParams: payload,
        filterOrder: {
          main_currency: payload.currencies[0],
          type: payload.types[0],
          side: payload.sides[0],
        },
      };
    case SET_FILTER_ORDER:
      return {
        ...state,
        filterOrder: {
          ...state.filterOrder,
          [payload.key]: payload.value,
        },
      };
    case CLEAR_FILTER_ORDER:
      return {
        ...state,
        filterOrder: payload,
      };
    case UPDATE_DEAL_PAIR:
      return {
        ...state,
        dealPair: payload[0],
        pair: {
          ...state.pair,
          deals: [...payload, ...state.pair.deals.slice(0, -payload.length)],
        },
      };
    case UPDATE_HISTORY_ORDER:
      const index = state.orders_history.data.findIndex(
        item => item.id === payload.id,
      );

      if (index !== -1) {
        return {
          ...state,
          orders_history: {
            ...state.orders_history,
            data: state.orders_history.data.map((item: any) => {
              if (item.id === payload.id) {
                return payload;
              }
              return item;
            }),
          },
        };
      } else {
        return {
          ...state,
          orders_history: {
            ...state.orders_history,
            data: [payload, ...state.orders_history.data],
          },
        };
      }

    default: {
      return state;
    }
  }
};

export default tradeViewReducer;
