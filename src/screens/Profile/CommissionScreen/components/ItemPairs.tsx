import React, {memo} from 'react';
import Text from '@components/textes/Text';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Item pair
 * @param {object} item
 * @param {function} handlePress
 * @param {boolean} checked
 */
const ItemPairs = ({item, handlePress, checked}: any) => {
  const checkedBackground = EStyleSheet.value('$white10');
  return (
    <TouchableOpacity
      style={[styles.checked, checked && {backgroundColor: checkedBackground}]}
      onPress={() => handlePress(item)}>
      <Text>{item.market}</Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  checked: {
    borderRadius: 5,
    padding: 10,
  },
});

export default memo(ItemPairs);
