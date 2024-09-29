import React, {memo} from 'react';

import {StyleProp, ViewStyle, Pressable} from 'react-native';

import styles from './styles';

interface IContainerItemProps {
  children: any;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ContainerItem = ({
  children,
  disabled = true,
  onPress,
  containerStyle,
}: IContainerItemProps) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={[styles.containerStyle, containerStyle]}>
    {children}
  </Pressable>
);

export default memo(ContainerItem);
