import {createSelector} from 'reselect';

export const selectTradeViewChat = (store: any) => store.tradeViewChat;

export const selectTradeViewChatFetching = createSelector(
  [selectTradeViewChat],
  store => store.fetching,
);
