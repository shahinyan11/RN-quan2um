import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput, View} from 'react-native';

import Text from '@components/textes/Text';
import {Props} from './types';
import st from './styles';

export default function InputText({
  label,
  blurMode,
  value,
  addAfter,
  addBefore,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  placeholderColor,
  ...props
}: Props) {
  const $white50 = EStyleSheet.value('$white50');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={labelStyle} type={'label'}>
          {label}
        </Text>
      )}

      <View style={[st.inputContainer, inputContainerStyle]}>
        {addBefore}
        <TextInput
          value={value}
          style={[st.input, inputStyle, blurMode && !isFocused && st.inputBlur]}
          placeholderTextColor={placeholderColor || $white50}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {addAfter}
      </View>
    </View>
  );
}
