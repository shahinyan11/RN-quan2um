import React, {memo} from 'react';
import styles from '@components/pickers/PickerModal/styles';
import RoundCheckBox from '@components/checkboxes/RoundCheckBox';
import Text from '@components/textes/Text';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Item interval to show time step
 * @param {object} item
 * @param {object} value
 * @param {function} onPressItem
 */
const ItemInterval = ({item, value, onPressItem}: any) => {
  const selectedColor = EStyleSheet.value('$primaryMain');
  const isSelected = value?.value === item.value;

  return (
    <TouchableOpacity
      onPress={() => onPressItem(item)}
      style={styles.itemContainerStyle}>
      <RoundCheckBox
        disabled={true}
        isSelected={isSelected}
        selectedColor={selectedColor}
      />
      <Text type="textRegular">{item.title}</Text>
    </TouchableOpacity>
  );
};

export default memo(ItemInterval);
