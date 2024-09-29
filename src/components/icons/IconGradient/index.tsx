import React, {memo} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import {IconsList} from '@components/icons/Icon/types';

import BaseIcon from '@constants/icons';

import styles from './styles';

export interface IconProps {
  name?: IconsList;
  size?: number;
  color?: string;
}

interface IIconGradientProps extends IconProps {
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  colors?: string[];
  type?: 'default' | 'alert';
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const IconGradient = ({
  name,
  size = 24,
  color = '#ffffff',
  colors,
  type = 'default',
  onPress,
  disabled = true,
  containerStyle,
  onPressIn,
  onPressOut,
}: IIconGradientProps) => {
  const defaultBackground = EStyleSheet.value('$blueGradient');
  const alertBackground = EStyleSheet.value('$yellowGradient');

  const typeGradient = {
    default: defaultBackground,
    alert: alertBackground,
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}>
      <LinearGradient
        colors={colors ?? typeGradient[type]}
        style={[styles.iconContainerStyle, containerStyle]}>
        <BaseIcon name={name} size={size} color={color} />
      </LinearGradient>
    </Pressable>
  );
};

export default memo(IconGradient);
