import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';

import st from './styles';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  color?: string;
}

export default function ApplicationStatus({
  containerStyle,
  text,
  color,
}: Props) {
  return (
    <View style={[st.container, {borderColor: color}, containerStyle]}>
      <Text style={[st.text, {color}]}>{text}</Text>
    </View>
  );
}
