import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {IPages} from './types';

const selectPagesStore = (store: IStore): IPages => store.pages;

export const selectLoading = createSelector(
  [selectPagesStore],
  pagesStore => pagesStore.loading,
);

export const selectFaqCategories = createSelector(
  [selectPagesStore],
  pagesStore => pagesStore.faq?.data.categories,
);

export const selectFaq = createSelector(
  [selectPagesStore],
  pagesStore => pagesStore.faq?.data.faqs,
);

export const selectTermsList = createSelector(
  [selectPagesStore],
  pagesStore => pagesStore.termsList,
);
