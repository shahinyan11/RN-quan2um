import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';

import styles from './styles';

interface IItemPicker {
  item: any;
  isActive: boolean;
  onPress: () => void;
}

const ItemPicker = ({item, isActive, onPress}: IItemPicker) => {
  const {primaryColor} = EStyleSheet.value('$primaryMain');

  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        justifyContent="space-between"
        containerStyle={[
          styles.itemContainerStyle,
          isActive && styles.activeItemContainerStyle,
        ]}>
        <Text type="description">{item.title}</Text>
        {isActive && <Icon name="check" color={primaryColor} size={16} />}
      </Row>
    </TouchableOpacity>
  );
};

export default memo(ItemPicker);
