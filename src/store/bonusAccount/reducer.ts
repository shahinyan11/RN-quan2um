import {SET_BONUS_ACCOUNT} from '../reducerTypes';
import {Action} from '@store/modal/types';

const initialState = {
  settings: {
    isUseForTradeFee: false,
    isUseForMasternodesInvestment: false,
  },
  balance: '',
  balanceInUSD: '',
  expirationDate: NaN,
  currencyCode: '',
};

const bonusAccountReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_BONUS_ACCOUNT:
      return {
        ...state,
        settings: {
          isUseForTradeFee: action.payload?.use_for_trade_fee,
          isUseForMasternodesInvestment:
            action.payload?.use_for_masternodes_investment,
        },
        balance: action.payload?.amount,
        balanceInUSD: action.payload?.amount_usd,
        expirationDate: action.payload?.expires_at,
        currencyCode: action.payload?.currency?.code,
      };

    default:
      return state;
  }
};

export default bonusAccountReducer;
