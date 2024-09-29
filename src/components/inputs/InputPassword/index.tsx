import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleProp, TextInput, TextInputProps, View} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ButtonLink from '@components/buttons/ButtonLink';

import styles from './styles';
import {checkPasswordStrength} from '@utils/validation';

interface IInputProps extends TextInputProps {
  label: string;
  isErrorVisible?: boolean;
  errorMessage?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  withAction?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  withPasswordLevel?: boolean;
  handleOnBlur?: () => void;
}

const InputPassword = ({
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
  withPasswordLevel = true,
  handleOnBlur,
}: IInputProps) => {
  const [isFocused, setFocused] = useState(false);
  const placeholderTextColor = EStyleSheet.value('$white25');
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [inputColor, setInputColor] = useState();

  const strongColor = EStyleSheet.value('$green');
  const mediumColor = EStyleSheet.value('$yellow');
  const weakColor = EStyleSheet.value('$red');

  const {t} = useTranslation();

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
    if (handleOnBlur) {
      handleOnBlur();
    }
  };

  const PasswordHintComponent = useCallback(() => {
    return (
      <Row alignItems="flex-end">
        <Text type="textMini">{t('common.security_check')}: </Text>

        <Text type="textMini" style={{color: inputColor}}>
          {passwordLevel === 10
            ? t('common.m_strong_password')
            : passwordLevel === 5
            ? t('common.m_normal_password')
            : t('common.m_easy_password')}
        </Text>
      </Row>
    );
  }, [passwordLevel, inputColor, t]);

  useEffect(() => {
    if (withPasswordLevel) {
      const level = checkPasswordStrength(value);

      if (level === 10) {
        setInputColor(strongColor);
      } else if (level === 5) {
        setInputColor(mediumColor);
      } else {
        setInputColor(weakColor);
      }

      setPasswordLevel(level);
    }
  }, [value, mediumColor, strongColor, weakColor, withPasswordLevel]);

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
          isFocused && {
            borderColor: inputColor,
          },
        ]}>
        <TextInput
          secureTextEntry
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
        />
      </View>
      <View
        // justifyContent="space-between"
        style={styles.topContainerStyle}>
        {isFocused && withPasswordLevel && <PasswordHintComponent />}
        <Text type="errorText" style={styles.errorTextStyle}>
          {isErrorVisible && errorMessage}
        </Text>
      </View>
    </View>
  );
};

export default memo(InputPassword);
