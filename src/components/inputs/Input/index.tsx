import React, {memo, useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ButtonLink from '@components/buttons/ButtonLink';
import Icon, {IIconProps} from '@components/icons/Icon';

import styles from './styles';

interface IInputProps extends TextInputProps {
  label: string;
  isErrorVisible?: boolean;
  errorMessage?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  withAction?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  withIcon?: boolean;
  icon?: IIconProps;
  onPressIcon?: () => void;
}

const Input = ({
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
  keyboardType,
  keyboardAppearance,
  onPressAction,
  containerStyle,
  secureTextEntry,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  maxLength,
  withIcon = false,
  icon,
  textContentType,
  onPressIcon,
}: IInputProps) => {
  const [isFocused, setFocused] = useState(false);
  const placeholderTextColor = EStyleSheet.value('$white25');

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.topContainerStyle}>
        <Text type="tTiny" style={[styles.labelStyle, labelStyle]}>
          {label}
        </Text>
        {withAction && (
          <ButtonLink
            disabled={false}
            type="label"
            title={actionLabel}
            onPress={onPressAction}
          />
        )}
        {maxLength && (
          <Text type="textMini">
            {value?.length}
            <Text type="textMini" style={styles.subHintStyle}>
              {' '}
              / {maxLength}
            </Text>
          </Text>
        )}
      </Row>
      <Row
        containerStyle={[
          styles.inputContainerStyle,
          inputContainerStyle,
          isFocused
            ? styles.inputFocusedStyle
            : !editable && styles.inputEditableStyle,
        ]}>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType={keyboardType}
          keyboardAppearance={keyboardAppearance}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeText}
          selectionColor="white"
          style={[styles.inputStyle, inputStyle]}
          onFocus={onFocus}
          onBlur={onBlur}
          textContentType={textContentType}
        />

        {withIcon && <Icon disabled={false} {...icon} onPress={onPressIcon} />}
      </Row>
      {isErrorVisible && (
        <Text type="errorText" style={styles.errorTextStyle}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default memo(Input);
