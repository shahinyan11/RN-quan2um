import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {IconAirplane} from '@assets/svgs';
import st from './styles';
import {useField} from 'formik';

const MessageInput = ({
  name,
  addAfter,
  addBefore,
  containerStyle,
  inputStyle,
  placeholderColor = EStyleSheet.value('$white35'),
  onFocus,
  onSend,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta, helper] = useField(name);
  const {value} = meta;

  const handleFocus = e => {
    onFocus?.(e.target);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[st.container, containerStyle, !isFocused && st.containerBlur]}>
      {addBefore}
      <TextInput
        value={value}
        onChangeText={helper.setValue}
        style={[st.input, inputStyle]}
        placeholderTextColor={placeholderColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={true}
        {...props}
      />
      <View style={st.rightBox}>
        {addAfter}
        <IconAirplane
          onPress={onSend}
          color={isFocused && 'rgba(2, 175, 251, 1)'}
        />
      </View>
    </View>
  );
};

export default MessageInput;
