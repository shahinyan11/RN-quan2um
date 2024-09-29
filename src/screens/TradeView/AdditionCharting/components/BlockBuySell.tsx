import React from 'react';
import Row from '@components/containers/Row';
import {View} from 'react-native';
import Text from '@components/textes/Text';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

/**
 * Block with info panel buy and sell
 */
const BlockBuySell = () => {
  const {t} = useTranslation();

  return (
    <Row justifyContent="space-evenly">
      <Row>
        <View style={[styles.view, styles.green]} />
        <Text>{t('common.buy')}</Text>
      </Row>
      <Row>
        <View style={[styles.view, styles.red]} />
        <Text>{t('create_order.submit_sell')}</Text>
      </Row>
    </Row>
  );
};

const styles = EStyleSheet.create({
  view: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  green: {
    backgroundColor: '$green',
  },
  red: {
    backgroundColor: '$red',
  },
});

export default BlockBuySell;
