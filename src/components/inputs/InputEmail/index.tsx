import React, {memo, useState} from 'react';
import {StyleProp, TextInput, TextInputProps, View} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ButtonLink from '@components/buttons/ButtonLink';

import styles from './styles';

interface IInputProps extends TextInputProps {
  label: string;
  isErrorVisible?: boolean;
  errorMessage?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  withAction?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  handleOnBlur?: () => void;
}

const InputEmail = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline,
  editable = true,
  isErrorVisible = false,
  errorMessage,
  withAction,
  actionLabel,
  onPressAction,
  containerStyle,
  handleOnBlur,
}: IInputProps) => {
  const [isFocused, setFocused] = useState(false);
  const placeholderTextColor = EStyleSheet.value('$white25');

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
    if (handleOnBlur) {
      handleOnBlur();
    }
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.topContainerStyle}>
        <Text type="tTiny" style={styles.labelStyle}>
          {label}
        </Text>
        {withAction && (
          <ButtonLink
            type="label"
            title={actionLabel}
            onPress={onPressAction}
          />
        )}
      </Row>
      <View
        style={[
          styles.inputContainerStyle,
          isFocused
            ? styles.inputFocusedStyle
            : !editable && styles.inputEditableStyle,
        ]}>
        <TextInput
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          selectionColor="white"
          style={styles.inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="email-address"
        />
      </View>
      <Text type="errorText" style={styles.errorTextStyle}>
        {isErrorVisible && errorMessage}
      </Text>
    </View>
  );
};

export default memo(InputEmail);
