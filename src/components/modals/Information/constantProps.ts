import i18next from 'i18next';
import {hideModal} from '@store/modal';
import {getTestQuestionStatus, testInit} from '@store/charity';
import {store} from '@store/index';
import {navigationRef} from '@navigation/index';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export const AUTH_REQUIRED = {
  title: i18next.t('charity.authorization_required'),
  description: i18next.t('charity.must_be_logged_in'),
  firstBtnText: i18next.t('auth.enter'),
  secondBtnText: i18next.t('tradeview.try_login_register'),
  firstBtnAction: () => {
    navigationRef.current?.navigate('Auth', {screen: 'SignIn'});
    store.dispatch(hideModal());
  },
  secondBtnAction: () => {
    navigationRef.current?.navigate('Auth', {screen: 'SignUp'});
    store.dispatch(hideModal());
  },
};

export const TIME_EXPIRED = {
  title: i18next.t('muslim_test.time_is_up'),
  description: i18next.t('muslim_test.unfortunately_time_is_up'),
  firstBtnText: i18next.t('charity.try_again'),
  secondBtnText: i18next.t('muslim_test.back_to_profile'),
  firstBtnAction: () => store.dispatch(getTestQuestionStatus()),
  secondBtnAction: () => {
    store.dispatch(hideModal());
    navigationRef.current?.goBack();
  },
};

export const MADE_MISTAKE = {
  title: i18next.t('muslim_test.you_made_mistake'),
  description: i18next.t('muslim_test.unfortunately_you_made_mistake'),
  firstBtnText: i18next.t('charity.try_again'),
  secondBtnText: i18next.t('muslim_test.back_to_profile'),
  firstBtnAction: () => store.dispatch(getTestQuestionStatus()),
  secondBtnAction: () => {
    store.dispatch(hideModal());
    navigationRef.current?.goBack();
  },
};

export const ATTEMPTS_OVER = {
  title: i18next.t('muslim_test.attempts_are_over'),
  description: i18next.t('muslim_test.unfortunately_you_made_5_mistake'),
  firstBtnText: i18next.t('charity.go_back_to__main_page'),
  firstBtnAction: () => store.dispatch(testInit(MONEY_COLLECTION_IDS.ZAKAT)),
};

export const ALREADY_APPLIED = {
  title: i18next.t('charity.you_have_already_submitted'),
  firstBtnText: i18next.t('common.good'),
  firstBtnAction: () => store.dispatch(hideModal()),
};

export const TEST_PASSED = {
  title: i18next.t('charity.you_passed_the_test'),
  description: i18next.t('charity.tell_us_more_about_yourself'),
  firstBtnText: i18next.t('common.continue'),
  firstBtnAction: () => {
    navigationRef.current?.navigate('ApplicationRegistration');
  },
};

export const PAY_ATTENTION = {
  title: i18next.t('charity.pay_attention'),
  description: i18next.t('charity.if_you_apply_for_zakat'),
  firstBtnText: i18next.t('charity.i_agree'),
  secondBtnText: i18next.t('common.cancel_registration'),
  secondBtnAction: () => {
    store.dispatch(hideModal());
  },
};

export const NEED_KYC = {
  title: i18next.t('charity.need_kyc_verification'),
  firstBtnText: i18next.t('charity.pass_kyc_verification'),
  firstBtnAction: () => navigationRef.current?.navigate('VerificationProfile'),
};
