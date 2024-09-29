import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';

import Text from '@components/textes/Text';
import Link from '@components/textes/Link';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import QrCode from '@components/other/QrCode';
import ContainerItem from '@components/containers/ContainerItem';

import {selectUser} from '@store/auth';

import styles from './styles';
import {onSuccessMessage} from '@store/app';
import {StackScreenProps} from '@react-navigation/stack';

export default function TransferPutIn({navigation}: StackScreenProps<any>) {
  const {phone, account_id} = useSelector(selectUser);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onCopyAccountId = () => {
    try {
      Clipboard.setString(account_id?.toString());

      dispatch(onSuccessMessage(t('common.copy_clipboard')));
    } catch (e) {
      console.error('[Error]: Account id is not found');
    }
  };

  const onCopyPhoneNumber = () => {
    try {
      if (phone) {
        Clipboard.setString(phone?.toString());

        dispatch(onSuccessMessage(t('common.copy_clipboard')));

        return;
      }
      navigation.navigate('Security');
    } catch (e) {
      console.error('[Error]: Phone number is not added');
    }
  };

  return (
    <SafeScrollContainer containerStyle={styles.mainContainerStyle}>
      <QrCode title={t('tfa_on_off.qr_desc')} value={account_id.toString()} />

      <ContainerItem
        disabled={false}
        onPress={onCopyPhoneNumber}
        containerStyle={styles.infoContainerStyle}>
        <Text type="t6" textAlign="center">
          {t('common.phone_number')}
        </Text>
        {phone ? (
          <>
            <Text type="btnSmall" style={styles.phoneNumberStyle}>
              +{phone}
            </Text>
            <Link title={t('common.copy')} type="btnMini" />
          </>
        ) : (
          <Link
            title={t('registration.button_enter_phone')}
            linkStyle={styles.linkAddPhoneNumberStyle}
            type="btnMini"
          />
        )}
      </ContainerItem>

      <ContainerItem
        disabled={false}
        onPress={onCopyAccountId}
        containerStyle={styles.infoContainerStyle}>
        <Text type="t6" textAlign="center">
          {t('common.user_id')}
        </Text>
        <Text type="btnSmall" style={styles.phoneNumberStyle}>
          {account_id}
        </Text>
        <Link title={t('common.copy')} type="btnMini" />
      </ContainerItem>
    </SafeScrollContainer>
  );
}
