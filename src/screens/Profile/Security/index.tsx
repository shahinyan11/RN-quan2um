import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import ItemMenu from '@components/items/ItemMenu';
import Switcher from '@components/switcher/Switch';

import styles from './styles';

import {SecurityNavigation} from '@navigation/config/types';

import {
  selectHasPhoneNumber,
  selectIsSocialAccount,
  selectTFAEnabled,
} from '@store/auth';
import {selectIsAppPasswordSet, setAppPassword} from '@store/app';
import {navigationRef} from '@navigation/index';
import {
  IconAppPassword,
  IconChangePassword,
  IconDeleteAccount,
  IconDisable2fa,
  IconPhoneNumber,
} from '@assets/svgs/screen';
import Devices from '@assets/svgs/others/Devices';

export default function Security({
  navigation,
}: StackScreenProps<SecurityNavigation, 'Security'>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isAppPasswordSet = useSelector(selectIsAppPasswordSet);
  const hasPhoneNumber = useSelector(selectHasPhoneNumber);
  const isSocialAccount = useSelector(selectIsSocialAccount);
  const isTFAEnabled = useSelector(selectTFAEnabled);

  const onPress = (screen: keyof SecurityNavigation) => () =>
    navigation.navigate(screen);

  const onEnableAppPassword = () => {
    if (isAppPasswordSet) {
      dispatch(setAppPassword(''));
      return;
    }
    navigation.navigate('PasswordSecurity');
  };

  const handPressTfa = () => {
    if (!isTFAEnabled) {
      navigationRef.current?.navigate('GTFANavigation');
      return;
    }

    navigationRef.current?.navigate('GTFANavigation', {
      screen: 'GTFAEnterCode',
    });
  };

  return (
    <SafeContainer>
      <ItemMenu
        IconComponent={IconDisable2fa}
        withRightIcon={true}
        title={t(isTFAEnabled ? 'common.disable_2fa' : 'common.enable_2fa')}
        onPress={handPressTfa}
        containerStyle={styles.itemContainerStyle}
      />

      <ItemMenu
        IconComponent={Devices}
        withRightIcon={true}
        title={t('common.devices')}
        onPress={onPress('Devices')}
        containerStyle={styles.itemContainerStyle}
      />
      <ItemMenu
        IconComponent={IconAppPassword}
        withRightIcon={false}
        title={t('common.m_application_password')}
        onPress={onEnableAppPassword}
        containerStyle={styles.itemContainerStyle}>
        <Switcher active={isAppPasswordSet} onPress={onEnableAppPassword} />
      </ItemMenu>
      {!hasPhoneNumber && (
        <ItemMenu
          IconComponent={IconPhoneNumber}
          withRightIcon={true}
          title={t('common.phone_number')}
          onPress={onPress('AccountConnectPhone')}
          containerStyle={styles.itemContainerStyle}
        />
      )}
      {!isSocialAccount && (
        <ItemMenu
          IconComponent={IconChangePassword}
          withRightIcon={true}
          title={t('change_pass.modal_form_title')}
          onPress={onPress('ChangePassword')}
          containerStyle={styles.itemContainerStyle}
        />
      )}
      <ItemMenu
        IconComponent={IconDeleteAccount}
        withRightIcon={true}
        title={t('common.deactivate')}
        onPress={onPress('AccountDeactivation')}
        containerStyle={styles.itemContainerStyle}
      />
      {/* )} */}
    </SafeContainer>
  );
}
