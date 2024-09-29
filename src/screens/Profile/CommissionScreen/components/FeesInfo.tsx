import React from 'react';
import {View} from 'react-native';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Fees info
 * @param {object} fees - fees of current pairs
 */
const FeesInfo = ({fees}: any) => {
  const {t} = useTranslation();

  return (
    <Row justifyContent="space-between" containerStyle={styles.container}>
      <View style={styles.feeBlock}>
        <Text type="label" style={styles.label}>
          {t('common.maker')}
        </Text>
        <Text type="t3">{fees.maker_fee}%</Text>
      </View>
      <View style={styles.feeBlock}>
        <Text type="label" style={styles.label}>
          {t('common.taker')}
        </Text>
        <Text type="t3">{fees.taker_fee}%</Text>
      </View>
    </Row>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: 30,
  },
  feeBlock: {
    borderRadius: 5,
    backgroundColor: '$white5',
    width: '48%',
    padding: 10,
  },
  label: {
    marginBottom: 5,
  },
});

export default FeesInfo;
