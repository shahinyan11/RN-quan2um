import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useField} from 'formik';
import st from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Eye, EyeClosed} from '@assets/svgs';
import {Props} from './types';

const PasswordField = ({
  label,
  name,
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
  const [visible, setVisible] = useState(false);
  const [field, meta, helper] = useField(name);
  const {value} = meta;

  const onChangeVisibility = () => {
    setVisible(!visible);
  };

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

  const IconComponent = visible ? EyeClosed : Eye;
  const hasError = meta.touched && meta.error;

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View
        style={[
          st.inputContainer,
          inputContainerStyle,
          // @ts-ignore
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
          secureTextEntry={!visible}
          {...props}
        />
        {addAfter}
        <View style={st.inputRight}>
          <TouchableOpacity onPress={onChangeVisibility}>
            <IconComponent size={22} color={'rgba(255, 255, 255, 0.5)'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PasswordField;
