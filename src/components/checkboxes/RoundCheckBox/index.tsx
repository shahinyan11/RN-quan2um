import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';

import styles from './styles';

const RoundCheckBox = memo(
  ({
    isSelected,
    title,
    disabled,
    onPress,
    selectedColor,
  }: {
    isSelected: boolean;
    title?: string;
    disabled?: boolean;
    onPress?: () => void;
    selectedColor: string;
  }) => (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Row>
        <View style={styles.checkBoxContainerStyle}>
          {isSelected && (
            <View
              style={[
                styles.checkBoxActiveStyle,
                {backgroundColor: selectedColor},
              ]}
            />
          )}
        </View>
        <Text style={styles.checkBoxTitleStyle}>{title}</Text>
      </Row>
    </TouchableOpacity>
  ),
);

export default RoundCheckBox;
