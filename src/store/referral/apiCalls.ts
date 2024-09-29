import api, {
  ACCOUNT_REFERRAL_SETTINGS,
  ACCOUNT_REFERRALS_ACCRUAL_HISTORY,
  ACCOUNT_REFERRALS_INVITATION,
  ACCOUNT_REFERRALS_REWARD,
} from '@api';
import {setLoading} from '@store/pages';
import {
  setReferralAccrualHistory,
  setReferralInvitation,
  setReferralReward,
  setReferralSettings,
} from '@store/referral/actions';

export const getReferralSettings = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(ACCOUNT_REFERRAL_SETTINGS);

    dispatch(setReferralSettings(data.is_enabled));
  } catch (e) {
    dispatch(setReferralSettings(false));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getReferralAccrualHistory = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(ACCOUNT_REFERRALS_ACCRUAL_HISTORY);

    dispatch(setReferralAccrualHistory(data.data));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getReferralInvitation = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(ACCOUNT_REFERRALS_INVITATION);

    dispatch(setReferralInvitation(data));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getReferralReward = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const {data} = await api.get(ACCOUNT_REFERRALS_REWARD);

    dispatch(setReferralReward(data));
  } finally {
    dispatch(setLoading(false));
  }
};
