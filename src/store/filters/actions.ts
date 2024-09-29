import {CLEAR_FILTERS, SET_FILTERS} from '@store/reducerTypes';

export const setFilters = (filters: any) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
