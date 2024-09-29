import React, {memo} from 'react';
import {Pressable} from 'react-native';

import BaseIcon from '@constants/icons';
import {IconProps} from './types';
import styles from './styles';

const Icon = ({
  name,
  size = 24,
  color = '#ffff',
  onPress,
  disabled = true,
  containerStyle,
}: IconProps) => {
  return (
    <Pressable
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      disabled={disabled}
      onPress={onPress}
      style={[styles.iconContainerStyle, containerStyle]}>
      <BaseIcon name={name} size={size} color={color} />
    </Pressable>
  );
};

export default memo(Icon);
