import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {ITradeView} from './types';

const selectTradeViewStore = (store: IStore): ITradeView => store.tradeview;

export const selectOrders = createSelector(
  selectTradeViewStore,
  store => store.orders.data,
);

export const selectLoading = createSelector(
  selectTradeViewStore,
  store => store.loading,
);

export const selectCurrencies = createSelector(
  selectTradeViewStore,
  store => store.currencies,
);

export const selectPairs = createSelector(
  selectTradeViewStore,
  store => store.pairs,
);

export const selectPair = createSelector(
  selectTradeViewStore,
  store => store.pair,
);

export const selectTVPairs = createSelector(
  selectTradeViewStore,
  store => store.trade_view,
);

export const selectChartDataSet = createSelector(
  selectTradeViewStore,
  store => store.chartDataSet,
);

export const selectOrderHistory = createSelector(
  selectTradeViewStore,
  store => store.orders_history.data,
);

export const selectPairCode = createSelector(
  selectTradeViewStore,
  store => store.pairCode,
);

export const selectOrderBook = createSelector(selectTradeViewStore, store => {
  return {
    ask: store.pair.order_book?.asks,
    bids: store.pair.order_book.bids,
  };
});

export const selectLoadingSend = createSelector(
  selectTradeViewStore,
  store => store.loadingSend,
);

export const selectDealsHistory = createSelector(
  selectTradeViewStore,
  store => store.dealsHistory,
);

export const selectDeepChart = createSelector(
  selectTradeViewStore,
  store => store.deepChart,
);

export const selectFilterParams = createSelector(
  selectTradeViewStore,
  store => store.filterParams,
);

export const selectFilterOrder = createSelector(
  selectTradeViewStore,
  store => store.filterOrder,
);

export const selectDealPair = createSelector(
  selectTradeViewStore,
  store => store.dealPair,
);

export const selectWhaleDeals = createSelector(
  selectTradeViewStore,
  store => store.whaleDeals,
);

export const selectWhaleDealTypes = createSelector(
  selectTradeViewStore,
  store => store.whaleDealTypes,
);

export const selectWhaleDealFilters = createSelector(
  selectTradeViewStore,
  store => [...store.whaleDealFilters],
);
