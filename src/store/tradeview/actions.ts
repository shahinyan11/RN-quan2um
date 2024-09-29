import api, {
  MARKET,
  TRADEVIEW_CHART,
  TRADEVIEW_CREATE_ORDER,
  TRADEVIEW_MARKET,
  TRADEVIEW_MARKETS,
  TRADEVIEW_ORDERS,
  TRADEVIEW_ORDERS_CANCEL,
  TRADEVIEW_ORDERS_HISTORY,
} from '@api';
import {onSuccessMessage} from '@store/app';

import {IAction, IPayload, IStore} from '@store/types';
import {addHours, getUnixTime, intervalToDuration} from 'date-fns';
import i18n from 'i18next';

import {
  IChart,
  IChartData,
  IOrders,
  ISocketPair,
  ITradeView,
  ITradeViewPair,
  Order,
  SET_ORDER_BOOK,
  SET_VALUE,
  UPDATE_ASSETS,
} from './types';
import {AppsFlyerLogEvent, trade} from '@utils/appsflyer';
import {
  CLEAR_FILTER_ORDER,
  GET_DEEP_CHART,
  GET_FILTER_PARAMS,
  SET_FILTER_ORDER,
  SET_PAIR_CODE,
  UPDATE_DEAL_PAIR,
  UPDATE_DEEP_CHART,
  UPDATE_HISTORY_ORDER,
} from '../reducerTypes';

const setValue = (payload: IPayload<ITradeView>) => ({
  type: SET_VALUE,
  payload,
});

const setLoading = (status: boolean = true): IAction<IPayload<ITradeView>> => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data: status,
  },
});

const setOrderBook = data => ({
  type: SET_ORDER_BOOK,
  payload: data,
});

export const setAssets = (payload: any) => ({
  type: UPDATE_ASSETS,
  payload,
});

export const setWhaleDealFilters = (payload: string[]) =>
  setValue({field: 'whaleDealFilters', data: payload});

export const getOrders =
  (config: {loadMore?: boolean} = {loadMore: false}) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      const {orders, pairCode} = getStore().tradeview;
      const {links, data} = orders;

      if (config.loadMore && !links.next) {
        return;
      }

      const needNextPage = config.loadMore && links.next;

      const REQUEST_URL = needNextPage
        ? links.next
        : `${TRADEVIEW_ORDERS}/${pairCode.toUpperCase()}`;

      dispatch(setLoading());

      api.get<IOrders>(REQUEST_URL).then(({data: responseData}) => {
        const tempOrders: IOrders = {
          ...responseData,
          data: needNextPage
            ? [...data, ...responseData.data]
            : responseData.data,
        };

        dispatch(
          setValue({
            field: 'orders',
            data: tempOrders,
          }),
        );
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onCancelOrder =
  (params: {ids: number[]}) =>
  async (dispatch: any, getStore: () => IStore) => {
    try {
      dispatch(setLoading());
      const {data, links, meta} = getStore().tradeview.orders;

      api
        .post(TRADEVIEW_ORDERS_CANCEL, null, {
          params: {
            ids: params.ids.join(','),
          },
        })
        .then(() => {
          dispatch(
            setValue({
              field: 'orders',
              data: {
                links,
                meta,
                data: data.filter(order => !params.ids.includes(order.id)),
              },
            }),
          );
        });
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getPairs = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(MARKET);

    dispatch(
      setValue({
        field: 'pairs',
        data: data.pairs,
      }),
    );
    dispatch(
      setValue({
        field: 'currencies',
        data: data.market_currencies,
      }),
    );
    dispatch({
      type: SET_PAIR_CODE,
      payload: data.pairs[0].pair,
    });
  } catch (e) {
    console.log('Getting market');
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Socket event "prices"
 * @param {object} data
 */
export const onUpdatePairs =
  (data: ISocketPair) => async (dispatch: any, getStore: () => IStore) => {
    const pairs = getStore().tradeview.pairs;

    const tempPairs = pairs.map(pair => {
      if (pair.pair_id === data.pair_id) {
        return {
          ...pair,
          last_price: data.price.toString(),
          last_price_face: data.pf,
          change_24: data.change,
          volume_24_face: data.main_volume_face,
        };
      }

      return pair;
    });

    dispatch(
      setValue({
        field: 'pairs',
        data: tempPairs,
      }),
    );
  };

export const getTradeViewPair = (pair: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(`${TRADEVIEW_MARKET}/${pair}`);

    dispatch(
      setValue({
        field: 'pair',
        data: data,
      }),
    );
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Set pair code
 * @param {string} pair
 */
export const setPairCode = (pair: string) => (dispatch: any) => {
  dispatch({
    type: SET_PAIR_CODE,
    payload: pair,
  });
};

/**
 * Socket event "prices"
 * @param socketPair
 */
export const onUpdateTVPair =
  (socketPair: ISocketPair) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      const pairs = getState().tradeview.trade_view;

      const tempPairs = pairs.map(item => {
        if (item.id === socketPair.pair_id) {
          return {
            ...item,
            change: socketPair.change,
          };
        }
        return item;
      });

      dispatch(
        setValue({
          field: 'trade_view',
          data: tempPairs,
        }),
      );
    } catch (e) {
      console.log('[ERROR]: Error updation tradeview pair list', e);
    }
  };

/**
 * Socket connection update pair
 * @param pair
 */
export const onUpdatePair =
  (pair: ISocketPair) => async (dispatch: any, getState: () => IStore) => {
    try {
      const {
        order_book,
        base_currency,
        main_currency,
        assets,
        deals,
        id,
        price_decimals,
        quantity_decimals,
        total_decimals,
      } = getState().tradeview.pair;

      if (id !== pair.pair_id) {
        return;
      }

      const {
        max_price,
        min_price,
        main_volume,
        base_volume,
        min_price_face,
        max_price_face,
        main_volume_face,
        base_volume_face,
        change,
        change_abs,
        change_abs_face,
      } = pair;

      const data: ITradeViewPair = {
        pair_id: pair.pair_id,
        last_price: pair.price,
        last_price_face: pair.pf,
        last_price_fiat: pair.price_fiat,
        last_price_fiat_face: pair.pff,
        min_price,
        max_price,
        main_volume,
        base_volume,
        min_price_face,
        max_price_face,
        main_volume_face,
        base_volume_face,
        change,
        change_abs,
        change_abs_face,
        //Static data
        deals,
        order_book,
        base_currency,
        main_currency,
        assets,
        id,
        price_decimals,
        total_decimals,
        quantity_decimals,
      };

      dispatch(
        setValue({
          field: 'pair',
          data,
        }),
      );
    } catch (e) {
      console.log('[Error]: Update pair');
    }
  };

export const getTradeViewPairs = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(TRADEVIEW_MARKETS);

    dispatch(
      setValue({
        field: 'trade_view',
        data: data,
      }),
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTradeViewChart =
  ({
    pair,
    timeEnd = new Date(),
    interval = '30m',
  }: {
    pair: string;
    timeEnd?: Date;
    interval?: string;
  }): any =>
  async (dispatch: any) => {
    try {
      const endDate = getUnixTime(timeEnd);

      const {data} = await api.get<IChart>(`${TRADEVIEW_CHART}/${pair}`, {
        params: {
          timeEnd: endDate,
          interval: interval,
          limit: 30,
        },
      });

      dispatch(
        setValue({
          field: 'chartDataSet',
          data: data.data,
        }),
      );
    } finally {
    }
  };

export const onCreateOrder =
  (
    config: {
      pair: string;
      type: 'buy' | 'sell';
      quantity: number;
      price?: number;
      total?: number;
    },
    onSuccess: () => void,
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setValue({field: 'loadingSend', data: true}));
      const {data} = await api.post(TRADEVIEW_CREATE_ORDER, config);

      dispatch(setAssets(data.user_balances));
      dispatch(onSuccessMessage(i18n.t('create_order.create_success_desc')));

      AppsFlyerLogEvent(trade, config);
      onSuccess();
    } finally {
      dispatch(setValue({field: 'loadingSend', data: false}));
    }
  };

/**
 * Socket connection update order book
 * @param data
 */
export const onSetOrderBook =
  (data: any) => async (dispatch: any, getState: () => IStore) => {
    try {
      const {base_currency, main_currency} = getState().tradeview.pair;

      const mCode = main_currency.code;
      const bCode = base_currency.code;

      if (`${mCode}_${bCode}` !== data.pair) {
        return;
      }

      dispatch(setOrderBook(data));
    } catch (e) {
      console.log('[Error]: Tradeview', e);
    }
  };

/**
 * Socket connection update chart data
 * @param data
 */
export const onUpdateChartData =
  (data: {
    pair_id: number;
    pair: string;
    price: string;
    quantity: string;
    time: number;
    socket: null;
  }) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      const {price, quantity, time, pair_id} = data;

      const {chartDataSet, pair} = getState().tradeview;

      if (pair_id !== pair.pair_id) {
        return;
      }

      if (!chartDataSet.length) {
        return;
      }

      const lstItemChartDataSet = chartDataSet[chartDataSet.length - 1];

      const lastDate = lstItemChartDataSet.time * 1000;
      const nextDate = addHours(lastDate, 1).getTime() / 1000;

      if (lstItemChartDataSet.is_temp) {
        const tempChartDataSet = chartDataSet.concat();
        const {hours: tempHours = 0} = intervalToDuration({
          start: chartDataSet[chartDataSet.length - 2].time * 1000,
          end: time * 1000,
        });

        let tempItem = {
          ...lstItemChartDataSet,
          close: +price,
          high: Math.max(lstItemChartDataSet.high, +price),
          low: Math.min(lstItemChartDataSet.low, +price),
          volume: lstItemChartDataSet.volume + +quantity,
          is_temp: tempHours < 1,
        };
        tempChartDataSet[chartDataSet.length - 1] = tempItem;

        dispatch(
          setValue({
            field: 'chartDataSet',
            data: tempChartDataSet,
          }),
        );
      } else {
        let tempItem: IChartData = {
          time: nextDate,
          high: +price,
          low: +price,
          open: +price,
          close: +price,
          volume: +quantity,
          is_temp: true,
        };
        dispatch(
          setValue({
            field: 'chartDataSet',
            data: [...chartDataSet, tempItem],
          }),
        );
      }
    } catch (e) {
      console.log('[Error]: Error with update chart data', e);
    }
  };

/**
 * Socket connection update order
 * @param socketOrder
 */
export const onUpdateOrder =
  (socketOrder: Order) => async (dispatch: any, getState: () => IStore) => {
    try {
      const {data, links, meta} = getState().tradeview.orders;

      const orderIndex = data.findIndex(item => item.id === socketOrder.id);

      if (socketOrder.status.value === 10) {
        dispatch(
          setValue({
            field: 'orders',
            data: {
              data: data.filter(item => item.id !== socketOrder.id),
              links,
              meta,
            },
          }),
        );
        return;
      }

      if (orderIndex >= 0) {
        const tempData = data.concat();
        tempData[orderIndex] = socketOrder;

        dispatch(
          setValue({
            field: 'orders',
            data: {data: tempData, links, meta},
          }),
        );
      } else {
        //Add new order
        dispatch(
          setValue({
            field: 'orders',
            data: {data: [socketOrder, ...data], links, meta},
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

export const getOrderHistory =
  (config: {loadMore?: boolean} = {loadMore: false}) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      // dispatch(setLoading());

      const {
        orders_history: {data: orders_history, links},
        filterOrder,
        pairCode,
      } = getState().tradeview;

      if (config.loadMore && !links.next) {
        return;
      }

      const url = config.loadMore
        ? links.next
        : `${TRADEVIEW_ORDERS_HISTORY}/${pairCode.toUpperCase()}`;

      let params = {};
      if (filterOrder?.apply) {
        params = {
          main_currency: filterOrder.main_currency.value,
          type: filterOrder.type.value,
          side: filterOrder.side.value,
        };
      }

      const {data} = await api.get<IOrders>(url, {params});

      const tempData: IOrders = {
        data: config.loadMore ? [...orders_history, ...data.data] : data.data,
        links: data.links,
        meta: data.meta,
      };

      dispatch(
        setValue({
          field: 'orders_history',
          data: tempData,
        }),
      );
    } finally {
      // dispatch(setLoading(false));
    }
  };

/**
 * Clear orders filter
 * @param params
 */
export const clearFilterOrder = (params: any) => (dispatch: any) => {
  dispatch({
    type: CLEAR_FILTER_ORDER,
    payload: params,
  });
};

/**
 * Set filter order
 * @param params
 */
export const setFilterOrder = (params: any) => (dispatch: any) => {
  dispatch({
    type: SET_FILTER_ORDER,
    payload: params,
  });
};

// export const getDealsHistory =
//   (pair: string, params: any) => async (dispatch: any) => {
//     try {
//       const {data} = await api.get(`/tradeview/deals/history/${pair}`, {
//         params,
//       });
//
//       dispatch({
//         type: GET_DEALS_HISTORY,
//         payload: data.data,
//       });
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

/**
 * Get deep chart data
 * @param {string} pair - the pair of chart data
 */
export const getDeepChartPair = (pair: string) => async (dispatch: any) => {
  try {
    const {data} = await api.get(`/tradeview/deep-chart/${pair}`);

    dispatch({
      type: GET_DEEP_CHART,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Update deep chart socket connection
 * @param {object} data
 */
export const onUpdateDeepChart = (data: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_DEEP_CHART,
    payload: data,
  });
};

/**
 * Get filter params
 */
export const getFilterParams = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const {data} = await api.get('/account/orders/filters');

    dispatch({
      type: GET_FILTER_PARAMS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getWhaleDealsReq =
  (filters: any[] = []) =>
  async (dispatch: any) => {
    try {
      const {data} = await api.get('/tradeview/whale-deals', {
        params: {kinds: filters},
      });

      dispatch(
        setValue({
          field: 'whaleDeals',
          data,
        }),
      );
    } catch (e) {
      console.log('getWhaleDealsReq', e);
    }
  };

export const getWhaleDealsFiltersReq = () => async (dispatch: any) => {
  try {
    const {data} = await api.get('/tradeview/init');

    dispatch(
      setValue({
        field: 'whaleDealTypes',
        data: data.whale_event_filters,
      }),
    );
  } catch (e) {
    console.log('getWhaleDealsFiltersReq', e);
  }
};

/**
 * Update deal. Socket connection
 * @param data
 */
export const updateDealPair = (data: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_DEAL_PAIR,
    payload: data,
  });
};

/**
 * Update history order from socket chanel "orders:personal"
 * @param data
 */
export const updateHistoryOrder = (data: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_HISTORY_ORDER,
    payload: data,
  });
};
