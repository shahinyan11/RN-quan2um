import React, {memo} from 'react';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledFontSize, scaledSize} from '@utils/scaledSize';
import {View} from 'react-native';
import {formatDate} from '@utils/fns';

/**
 * Item deal's history
 * @param {object} item
 */
const ItemDeal = ({item}: any) => {
  const red = EStyleSheet.value('$red');
  const green = EStyleSheet.value('$green');
  const color = item.is_buy ? green : red;

  return (
    <Row justifyContent="space-between" containerStyle={styles.containerStyle}>
      <View style={styles.leftBlockContainerStyle}>
        <Text style={styles.titleStyle}>
          {formatDate(item.time, 'dd.MM.yyyy; HH:mm:ss')}
        </Text>
      </View>
      <View style={styles.centerBlockContainerStyle}>
        <Text style={[styles.titleStyle, {color}]}>{item.price}</Text>
      </View>
      <View style={styles.rightBlockContainerStyle}>
        <Text style={styles.titleStyle}>{item.quantity}</Text>
      </View>
    </Row>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    marginBottom: scaledSize(10),
  },
  leftBlockContainerStyle: {
    flex: 1,
  },
  centerBlockContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  rightBlockContainerStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleStyle: {
    fontSize: scaledFontSize(12),
    color: '$white',
  },
});

export default memo(ItemDeal);
