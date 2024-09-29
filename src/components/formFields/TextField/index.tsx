import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useField} from 'formik';
import st from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Props} from './types';

const TextField = ({
  label,
  name,
  blurMode,
  addAfter,
  addBefore,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  placeholderColor,
  onFocus,
  ...props
}: Props) => {
  const $white50 = EStyleSheet.value('$white50');
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta, helper] = useField(name);
  const {value} = meta;

  const handleFocus = e => {
    onFocus?.(e.target);
    setIsFocused(true);
    helper.setTouched(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
    helper.setTouched(true);
    field.onBlur(name);
  };

  const hasError = meta.touched && meta.error;

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View
        style={[
          st.inputContainer,
          inputContainerStyle,
          hasError && st.errorContainer,
        ]}>
        {addBefore}
        <TextInput
          value={value}
          onChangeText={helper.setValue}
          style={[st.input, inputStyle]}
          placeholderTextColor={placeholderColor || $white50}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {addAfter}
      </View>
    </View>
  );
};

export default TextField;
