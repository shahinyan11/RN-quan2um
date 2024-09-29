import {
  SET_REFERRAL_ACCRUAL_HISTORY,
  SET_REFERRAL_INVITATION,
  SET_REFERRAL_REWARD,
  SET_REFERRAL_SETTINGS,
} from '../reducerTypes';
import {Action} from '@store/bottomSheet/types';

const initialState = {
  is_enabled: false,
  accrualHistory: [],
  invitation: {},
  reward: {},
};

const bottomSheetReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_REFERRAL_SETTINGS:
      return {
        ...state,
        is_enabled: action.payload,
      };

    case SET_REFERRAL_ACCRUAL_HISTORY:
      return {
        ...state,
        accrualHistory: action.payload,
      };

    case SET_REFERRAL_INVITATION:
      return {
        ...state,
        invitation: action.payload,
      };

    case SET_REFERRAL_REWARD:
      return {
        ...state,
        reward: action.payload,
      };

    default:
      return state;
  }
};

export default bottomSheetReducer;
