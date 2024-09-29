import React, {memo, useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import styles from './styles';

interface IInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
}

const InputSearch = ({
  autoFocus = false,
  placeholder,
  value,
  onChangeText,
  multiline,
  editable = true,
  containerStyle,
  inputContainerStyle,
  iconSize,
}: IInputProps) => {
  const placeholderTextColor = EStyleSheet.value('$white25');

  const onClearField = () => {
    if (onChangeText) {
      onChangeText('');
    }
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Row
        containerStyle={[
          styles.inputContainerStyle,
          !editable && styles.inputEditableStyle,
          inputContainerStyle,
        ]}>
        <Icon name="search" size={iconSize} />
        <TextInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          autoFocus={autoFocus}
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          selectionColor="white"
          style={styles.inputStyle}
        />
        {Boolean(value) && (
          <Icon disabled={false} name="close" onPress={onClearField} />
        )}
      </Row>
    </View>
  );
};

export default memo(InputSearch);
