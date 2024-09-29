import api, {BONUS_ACCOUNT} from '@api';
import {setBonusAccount} from './actions';

export const getBonusAccount = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(BONUS_ACCOUNT);
    dispatch(setBonusAccount(data.bonus_wallet));
  } catch (e) {
    console.log('getBonusAccount', e.response);
  }
};
