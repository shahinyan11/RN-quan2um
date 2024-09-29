import React, {memo} from 'react';
import {StyleProp, TouchableOpacity} from 'react-native';
import {ViewStyle} from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';

import styles from './styles';

interface IButtonSwitcher {
  active: boolean;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const ButtonSwitcher = ({
  active,
  title,
  containerStyle,
  onPress,
}: IButtonSwitcher) => {
  return (
    <TouchableOpacity
      style={[
        styles.activeButtonContainerStyle,
        !active && styles.disabledButtonContainerStyle,
        containerStyle,
      ]}
      onPress={onPress}>
      <Text type="btnMini" textAlign="center" style={styles.titleStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ButtonSwitcher);
