import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import styles from './styles';

import {scaledSize} from '@utils/scaledSize';

interface ICheckBoxProps {
  title?: string;
  isActive: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  checkboxContainerStyle?: StyleProp<ViewStyle>;
}

const CheckBox = ({
  title,
  isActive,
  onPress,
  containerStyle,
  checkboxContainerStyle,
}: ICheckBoxProps) => {
  return (
    <Row containerStyle={[styles.containerStyle, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={[
            styles.inactiveCheckBox,
            checkboxContainerStyle,
            isActive && styles.activeCheckBox,
          ]}>
          {isActive && <Icon name="check" size={scaledSize(19)} />}
        </View>
      </TouchableOpacity>
      {title && (
        <View style={styles.titleStyle}>
          <Text type="textSmall">{title}</Text>
        </View>
      )}
    </Row>
  );
};

export default CheckBox;
