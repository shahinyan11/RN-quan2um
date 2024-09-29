import React, {memo, useEffect, useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ButtonLink from '@components/buttons/ButtonLink';
import CountryPicker from '@components/pickers/CountryPicker';
import {ICountry} from '@constants/countries';
import COUNTRY from '@constants/countries/countries.json';

import styles from './styles';

const DEFAULT_COUNTRY = {
  id: 231,
  iso: 'UKR',
  iso2: 'ua',
  name: 'Ukraine',
  dialCode: '380',
};

export interface IPhone {
  code: string;
  phone: string;
  countryId: number;
}

interface IInputProps extends TextInputProps {
  label: string;
  isErrorVisible?: boolean;
  errorMessage?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  withAction?: boolean;
  value: IPhone;
  onChangeText: (value: IPhone) => void;
  containerStyle?: StyleProp<ViewStyle>;
  handleOnBlur?: () => void;
}

const InputPhone = ({
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
  const [country, setCountry] = useState(DEFAULT_COUNTRY as ICountry);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
    if (handleOnBlur) {
      handleOnBlur();
    }
  };

  const onEnterPhone = (phone: string) => {
    onChangeText({
      code: country.dialCode,
      phone,
      countryId: country.id,
    });
  };

  useEffect(() => {
    const currentCountry =
      COUNTRY.find(item => item.dialCode === value.code) ?? DEFAULT_COUNTRY;
    setCountry(currentCountry);
  }, []);

  const handleSetCountry = (newCountry: any) => {
    onChangeText({
      code: newCountry.dialCode,
      phone: value.phone,
      countryId: newCountry.id,
    });
    setCountry(newCountry);
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
      <Row
        containerStyle={[
          styles.inputContainerStyle,
          isFocused
            ? styles.inputFocusedStyle
            : !editable && styles.inputEditableStyle,
        ]}>
        <CountryPicker
          onChange={handleSetCountry}
          defaultSelectedCountry={231}
          showPhoneCode
        />
        <TextInput
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value.phone}
          onChangeText={onEnterPhone}
          selectionColor="white"
          style={styles.inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="number-pad"
        />
      </Row>
      <Text type="errorText" style={styles.errorTextStyle}>
        {isErrorVisible && errorMessage}
      </Text>
    </View>
  );
};

export default memo(InputPhone);
