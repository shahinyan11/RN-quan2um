import React from 'react';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import SItemMenu from '@components/items/SItemMenu';
import {getVersion, getBuildNumber} from 'react-native-device-info';
import {StackScreenProps} from '@react-navigation/stack';

export default function AboutUs({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const buildNumber = getBuildNumber();
  const version = getVersion();

  const onPressTermsOfUse = () => navigation.navigate('TermsOfUse');

  return (
    <SafeContainer>
      <SItemMenu
        title={t('terms.terms_conditions')}
        onPress={onPressTermsOfUse}
      />
      <SItemMenu
        showIcon={false}
        title={t('common.m_version')}
        subtitle={`${version} (${buildNumber})`}
      />
    </SafeContainer>
  );
}
