import React from 'react';
import {Pressable, View} from 'react-native';

import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';
import {Props} from './types';
import st from './styles';

export default function InputSelect({
  label,
  value,
  addAfter,
  addBefore,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  labelStyle,
  onPress,
  iconColor = 'white',
  disabled = false,
}: Props) {
  return (
    <Pressable style={containerStyle} onPress={!disabled ? onPress : () => {}}>
      {label && (
        <Text type={'label'} style={labelStyle}>
          {label}
        </Text>
      )}

      <View style={[st.inputContainer, inputContainerStyle]}>
        {addBefore}
        <Text numberOfLines={1} style={[st.input, inputStyle]}>
          {value}
        </Text>
        <Icon name={'arrow-down'} color={iconColor} />
        {addAfter}
      </View>
    </Pressable>
  );
}
