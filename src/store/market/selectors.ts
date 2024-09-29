import {createSelector} from 'reselect';
import {IStore} from '@store/types';

const selectHomePageStore = (store: IStore): any => store.market;

const selectMarketData = createSelector(
  [selectHomePageStore],
  storeMarket => storeMarket.marketData,
);

// const selectMarketCurrencies = createSelector(
//   [selectMarketStore],
//   storeMarket => storeMarket.marketCurrencies,
// );

const selectHomePageSlides = createSelector(
  [selectHomePageStore],
  storeMarket => storeMarket.homePageSlides,
);

const selectHomePage = createSelector(
  [selectHomePageStore],
  store => store.homePage,
);

export {selectMarketData, selectHomePageSlides, selectHomePage};
