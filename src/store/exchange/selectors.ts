import {IStore} from '@store/types';
import {createSelector} from 'reselect';

export const selectExchangeStore = (store: IStore) => store.exchange;

export const selectSelectedMethod = createSelector(
  selectExchangeStore,
  exchangeStore => {
    if (
      exchangeStore.currentExchange?.status &&
      exchangeStore.currentExchange?.status !== 'expired'
    ) {
      return exchangeStore.currentExchange?.method;
    } else {
      return exchangeStore.selectedMethod?.method
        ? exchangeStore.selectedMethod
        : exchangeStore.list[0] || {};
    }
  },
);

export const selectCurrentExchange = createSelector(
  selectExchangeStore,
  exchangeStore => {
    const {currentExchange} = exchangeStore;
    const status = currentExchange?.status;

    return status && status !== 'expired' ? currentExchange : undefined;
  },
);
