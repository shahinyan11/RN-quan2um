import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import {scaledSize} from '@utils/scaledSize';

const styles = EStyleSheet.create({
  pickerPercentContainerStyle: {
    marginVertical: scaledSize(12),
  },
  pickerPercentButtonStyle: {
    height: scaledSize(24),
    width: scaledSize(40),
    backgroundColor: '$white5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledSize(6),
  },
  selectedStyle: {
    backgroundColor: '$primaryMain',
  },
});

const PickerPercent = ({
  value,
  onPress,
}: {
  value: number | undefined;
  onPress: (value: number) => void;
}) => {
  const PERCENTAGE = [25, 50, 75, 100];

  const renderItem = (item: number, index: number) => {
    const isSelected = item === value;
    const onPressItem = () => {
      if (isSelected) {
        onPress(undefined);
        return;
      }
      onPress(item);
    };

    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={onPressItem}
        style={[
          styles.pickerPercentButtonStyle,
          isSelected && styles.selectedStyle,
        ]}>
        <Text type="btnMini">{item}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Row
      justifyContent="space-between"
      containerStyle={styles.pickerPercentContainerStyle}>
      {PERCENTAGE.map(renderItem)}
    </Row>
  );
};

export default memo(PickerPercent);
