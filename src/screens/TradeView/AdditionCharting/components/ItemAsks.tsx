import React, {memo} from 'react';
import {View} from 'react-native';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Item of asks
 * @param {object} item
 */
const ItemAsks = ({item}: any) => {
  return (
    <Row containerStyle={styles.row}>
      <View style={[styles.backRed, {width: `${item.pr}%`}, styles.absolute]} />
      <Row justifyContent="space-between" containerStyle={styles.rowText}>
        <Text type="t6" style={styles.asksPrice}>{item.p}</Text>
        <Text type="t6">{item.vf}</Text>
      </Row>
    </Row>
  );
};

const styles = EStyleSheet.create({
  asksPrice: {
    color: '$red',
  },
  row: {
    marginBottom: 2,
  },
  rowText: {
    width: '100%',
    padding: 2,
  },
  absolute: {
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  backRed: {
    backgroundColor: '$red25',
    left: 0,
  },
});

export default memo(ItemAsks);
