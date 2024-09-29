import React from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import ItemMenu from '@components/items/ItemMenu';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

export default function Support({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const onPressCenterSupport = () => {
    navigation.navigate('SupportCenter');
  };
  const onPressFeedback = () => {
    navigation.navigate('Questions');
  };
  return (
    <SafeContainer containerStyle={stylesGlobal.screenContainerStyle}>
      <ItemMenu
        icon="questionmark"
        withRightIcon={true}
        title={t('common.support_center')}
        onPress={onPressCenterSupport}
        containerStyle={styles.itemContainerStyle}
      />
      <ItemMenu
        icon="comment"
        withRightIcon={true}
        title={t('common.m_feedback')}
        onPress={onPressFeedback}
        containerStyle={styles.itemContainerStyle}
      />
    </SafeContainer>
  );
}
