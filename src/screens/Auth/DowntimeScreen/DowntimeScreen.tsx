import React from 'react';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Downtime screen when response status is 503
 */
const DowntimeScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeContainer containerStyle={styles.container}>
      <Text type="t2" textAlign="center">
        {t('common.m_downtime-message')}
      </Text>
    </SafeContainer>
  );
};

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default DowntimeScreen;
