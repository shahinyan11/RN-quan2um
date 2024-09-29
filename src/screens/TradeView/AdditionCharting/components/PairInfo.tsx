import React from 'react';
import {View} from 'react-native';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Info pair
 * @param {object} pair
 * @param {object} dealPair
 */
const PairInfo = ({pair, dealPair}: any) => {
  const {t} = useTranslation();

  const red = EStyleSheet.value('$red');
  const green = EStyleSheet.value('$green');
  const changeDirection = pair.change >= 0;
  const iconColor = changeDirection ? green : red;
  const changeSign = changeDirection ? '+' : '';
  const pfColor = dealPair?.is_buy ? green : red;

  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" containerStyle={styles.row}>
        <Row>
          <Text type="t6" style={{color: pfColor}}>
            {dealPair?.price_face || pair.last_price_face}
          </Text>
        </Row>
        <Text type="t6" style={{color: iconColor}}>
          {pair.change_abs_face}
        </Text>
        <Text
          type="t6"
          style={{color: iconColor}}>{`${changeSign}${pair.change}%`}</Text>
        <Text type="t6">{pair.last_price_fiat_face}</Text>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.row}>
        <Row justifyContent="space-between" containerStyle={styles.innerRow1}>
          <Text type="t6" style={styles.label}>
            {t('common.max_24_short')}
          </Text>
          <Text type="t6">{pair.max_price_face}</Text>
        </Row>
        <Row justifyContent="space-between" containerStyle={styles.innerRow2}>
          <Text type="t6" style={styles.label}>
            {`${t('common.volume_24_short')}(${pair.main_currency.code})`}
          </Text>
          <Text type="t6">{pair.main_volume_face}</Text>
        </Row>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.row}>
        <Row justifyContent="space-between" containerStyle={styles.innerRow1}>
          <Text type="t6" style={styles.label}>
            {t('common.min_24_short')}
          </Text>
          <Text type="t6">{pair.min_price_face}</Text>
        </Row>
        <Row justifyContent="space-between" containerStyle={styles.innerRow2}>
          <Text type="t6" style={styles.label}>
            {`${t('common.volume_24_short')}(${pair.base_currency.code})`}
          </Text>
          <Text type="t6">{pair.base_volume_face}</Text>
        </Row>
      </Row>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
  },
  innerRow1: {
    width: '33%',
  },
  innerRow2: {
    width: '63%',
    marginLeft: 5,
  },
  label: {
    color: '$white50',
  },
  row: {
    marginTop: 10,
  },
});

export default PairInfo;
