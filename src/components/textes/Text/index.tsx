import React, {memo} from 'react';

import {StyleProp, Text as RNText, TextProps, TextStyle} from 'react-native';

import styles from './styles';

export type TextType =
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5'
  | 't6'
  | 'tTiny'
  | 'btnMini'
  | 'btnRegular'
  | 'btnSmall'
  | 'textMiddle'
  | 'textMini'
  | 'textRegular'
  | 'textSmall'
  | 'errorText'
  | 'description'
  | 'hint'
  | 'label';

interface ITextProps extends TextProps {
  children?: any;
  style?: StyleProp<TextStyle>;
  type?: TextType;
  numberOfLines?: number;
  onPress?: () => void;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontWeight?: TextStyle['fontWeight'];
}

const Text = ({
  children,
  numberOfLines,
  style,
  type = 'textMiddle',
  textAlign = 'auto',
  fontWeight,
  onPress,
}: ITextProps) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[styles[type], {textAlign, fontWeight}, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {children}
    </RNText>
  );
};

export default memo(Text);
