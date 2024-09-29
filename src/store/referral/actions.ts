import {
  SET_REFERRAL_ACCRUAL_HISTORY,
  SET_REFERRAL_INVITATION,
  SET_REFERRAL_REWARD,
  SET_REFERRAL_SETTINGS,
} from '@store/reducerTypes';

export const setReferralSettings = (is_enabled: boolean) => ({
  type: SET_REFERRAL_SETTINGS,
  payload: is_enabled,
});

export const setReferralAccrualHistory = (historyList: any[]) => ({
  type: SET_REFERRAL_ACCRUAL_HISTORY,
  payload: historyList,
});

export const setReferralInvitation = (invitation: any) => ({
  type: SET_REFERRAL_INVITATION,
  payload: invitation,
});

export const setReferralReward = (reward: any) => ({
  type: SET_REFERRAL_REWARD,
  payload: reward,
});
