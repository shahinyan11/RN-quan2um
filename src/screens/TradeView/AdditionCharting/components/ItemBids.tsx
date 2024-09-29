import React, {memo} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {View} from 'react-native';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

/**
 * Item of bids
 * @param {object} item
 */
const ItemBids = ({item}: any) => {
  return (
    <Row containerStyle={styles.row}>
      <View
        style={[styles.backGreen, {width: `${item.pr}%`}, styles.absolute]}
      />
      <Row justifyContent="space-between" containerStyle={styles.rowText}>
        <Text type="t6">{item.vf}</Text>
        <Text type="t6" style={styles.bidsPrice}>
          {item.p}
        </Text>
      </Row>
    </Row>
  );
};

const styles = EStyleSheet.create({
  row: {
    marginBottom: 2,
  },
  bidsPrice: {
    color: '$green',
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
  backGreen: {
    backgroundColor: '$green25',
    right: 0,
  },
});

export default memo(ItemBids);
