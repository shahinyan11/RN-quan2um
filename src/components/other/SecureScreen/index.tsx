import React from 'react';

import {ScrollView} from 'react-native';

import Text from '@components/textes/Text';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '@components/icons/Icon';
import {scaledSize} from '@utils/index';
import {useTranslation} from 'react-i18next';

const styles = EStyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161920',
    paddingHorizontal: '5%',
  },
  titleStyle: {
    marginVertical: scaledSize(20),
  },
  descriptionStyle: {
    textAlign: 'center',
    marginVertical: scaledSize(10),
  },
  screenBackground: {
    backgroundColor: '#161920',
  },
});

export default function PinSecure({
  isRooted,
  isOnExternalStorage,
  isPinEnabled,
}: {
  isRooted: boolean;
  isOnExternalStorage: boolean;
  isPinEnabled: boolean;
}) {
  const {t} = useTranslation();

  return (
    <ScrollView
      style={styles.screenBackground}
      contentContainerStyle={styles.containerStyle}>
      <Icon name="lock" size={100} />
      <Text type="t2" style={styles.titleStyle}>
        {t('auth.m_device_secure')}
      </Text>

      {!isPinEnabled && (
        <Text type="description" style={styles.descriptionStyle}>
          {t('auth.m_secure_code_message')}
        </Text>
      )}

      {isRooted && (
        <Text type="description" style={styles.descriptionStyle}>
          {t('auth.m_rooted_device')}
        </Text>
      )}

      {isOnExternalStorage && (
        <Text type="description" style={styles.descriptionStyle}>
          {t('auth.m_storage_message')}
        </Text>
      )}
    </ScrollView>
  );
}
