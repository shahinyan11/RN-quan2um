import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import ItemMenu from '@components/items/ItemMenu';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import ItemProfile from '@components/items/ItemProfile';

import {getUserInfo, selectUser} from '@store/auth';
import {getFees} from '@store/account';
import {getReferralSettings} from '@store/referral/apiCalls';

export default function Profile({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {account_id, email, level_name, is_verified} = useSelector(selectUser);
  const {is_enabled} = useSelector(state => state.referrals);

  useEffect(() => {
    dispatch(getReferralSettings());

    const focusListener = navigation.addListener('focus', () => {
      dispatch(getUserInfo());
    });

    return focusListener;
  }, [dispatch, navigation]);

  const navigationTo = (screenName: string) => () => {
    navigation.navigate(screenName);
  };

  const onPressFees = () => {
    dispatch(getFees());
    navigation.navigate('CommissionScreen');
  };

  return (
    <SafeScrollContainer>
      <ItemProfile id={account_id} email={email} vipCounter={level_name} />
      {!is_verified && (
        <ItemMenu
          icon="idcard"
          title={t('verify_user.m_verify')}
          onPress={navigationTo('VerificationProfile')}
        />
      )}
      {is_enabled && (
        <ItemMenu
          icon="hands"
          title={t('info_referral.referral_program')}
          onPress={navigationTo('ReferralProgramScreen')}
        />
      )}

      <ItemMenu
        icon="shield"
        title={t('common.security')}
        onPress={navigationTo('Security')}
      />
      {/*<ItemMenu*/}
      {/*  icon="headphones"*/}
      {/*  title={t('common.support')}*/}
      {/*  onPress={navigationTo('Support')}*/}
      {/*/>*/}
      <ItemMenu
        icon="bell"
        title={t('notifications.notifications')}
        onPress={navigationTo('Notifications')}
      />
      <ItemMenu
        icon="fees"
        title={t('common.m_fee_trading')}
        onPress={onPressFees}
      />
      <ItemMenu
        icon="account-type"
        title={t('account.title_account_type')}
        onPress={navigationTo('AccountTypeScreen')}
      />
      <ItemMenu
        icon="settings"
        title={t('header.m_settings')}
        onPress={navigationTo('Settings')}
      />
    </SafeScrollContainer>
  );
}
