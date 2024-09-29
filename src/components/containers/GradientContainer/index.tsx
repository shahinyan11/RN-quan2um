import React, {memo} from 'react';

import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

import styles from './styles';
import {deg} from 'react-native-linear-gradient-degree';
import LinearGradient from 'react-native-linear-gradient';

interface IContainerItemProps {
  children: any;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const GradientContainer = ({
  children,
  disabled = false,
  onPress,
  containerStyle,
  contentContainerStyle,
}: IContainerItemProps) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[styles.containerStyle, containerStyle]}>
    <LinearGradient
      style={contentContainerStyle}
      colors={[
        'rgba(65, 65, 91, 1)',
        'rgba(40, 40, 56, 1)',
        'rgba(45, 45, 65, 1)',
      ]}
      locations={[0, 0.38, 0.85]}
      {...deg(155)}>
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

export default memo(GradientContainer);
