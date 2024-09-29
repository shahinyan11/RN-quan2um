import {SET_BONUS_ACCOUNT} from '@store/reducerTypes';

export const setBonusAccount = (data: any) => ({
  type: SET_BONUS_ACCOUNT,
  payload: data,
});

export const clearFilters = () => ({
  // type: CLEAR_FILTERS,
});
