import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type Props = {
  label?: string;
  value?: string;
  iconColor?: string;
  onPress?: () => void;
  addAfter?: JSX.Element | React.FC;
  addBefore?: JSX.Element | React.FC;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};
